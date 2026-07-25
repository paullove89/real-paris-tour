import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");

const generatedPath = path.join(workspaceRoot, "src/data/tours.generated.json");
const overridesPath = path.join(workspaceRoot, "src/data/tour-overrides.json");

const apiUrl = process.env.BOKUN_TOURS_API_URL;
const apiToken = process.env.BOKUN_API_TOKEN;
const apiKey = process.env.BOKUN_API_KEY;
const customHeadersJson = process.env.BOKUN_REQUEST_HEADERS_JSON;
const syncRequired = process.env.BOKUN_SYNC_REQUIRED === "true";

function normalizeSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toDurationLabel(rawDuration, durationMinutes) {
  if (typeof rawDuration === "string" && rawDuration.trim()) {
    return rawDuration.trim();
  }

  const minutes = Number(durationMinutes);
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return "TBD";
  }

  const hours = minutes / 60;
  if (Number.isInteger(hours)) {
    return `${hours} hours`;
  }

  return `${hours.toFixed(1)} hours`;
}

function toGroupLabel(rawGroup, maxParticipants) {
  if (typeof rawGroup === "string" && rawGroup.trim()) {
    return rawGroup.trim();
  }

  const max = Number(maxParticipants);
  if (Number.isFinite(max) && max > 0) {
    return `Max ${max} guests`;
  }

  return "Small group";
}

function toHighlights(rawHighlights) {
  if (Array.isArray(rawHighlights)) {
    return rawHighlights.map((value) => String(value).trim()).filter(Boolean);
  }

  if (typeof rawHighlights === "string") {
    return rawHighlights
      .split(/\n|•|\|/)
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return [];
}

function toImageUrls(rawImages) {
  if (!Array.isArray(rawImages)) {
    return [];
  }

  return rawImages
    .map((image) => {
      if (typeof image === "string") {
        return image;
      }

      if (image && typeof image === "object") {
        return image.url || image.src || image.imageUrl || image.original;
      }

      return undefined;
    })
    .map((value) => (value ? String(value).trim() : ""))
    .filter(Boolean);
}

function selectItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  const candidates = [
    payload?.experiences,
    payload?.activities,
    payload?.results,
    payload?.data,
    payload?.items,
  ];

  const firstArray = candidates.find((candidate) => Array.isArray(candidate));
  return Array.isArray(firstArray) ? firstArray : [];
}

function mapBokunTour(raw) {
  const title = raw.title || raw.name || raw.activityName || raw.experienceName;
  if (!title) {
    return null;
  }

  const slugSource = raw.slug || raw.externalId || raw.id || title;
  const slug = normalizeSlug(slugSource);
  if (!slug) {
    return null;
  }

  const imageUrls = toImageUrls(raw.images || raw.gallery || raw.photos);
  const coverImage =
    raw.coverImage || raw.image?.url || raw.imageUrl || raw.mainImage || imageUrls[0] || undefined;

  const rawPrice =
    raw.priceEur ??
    raw.price?.amount ??
    raw.pricing?.fromPrice ??
    raw.fromPrice ??
    raw.startingPrice ??
    0;

  const priceEur = Number(rawPrice);

  const highlights =
    toHighlights(raw.highlights).length > 0
      ? toHighlights(raw.highlights)
      : toHighlights(raw.descriptionHighlights || raw.summary);

  return {
    slug,
    title: String(title).trim(),
    duration: toDurationLabel(raw.duration, raw.durationMinutes || raw.lengthMinutes),
    priceEur: Number.isFinite(priceEur) ? Math.round(priceEur) : 0,
    groupSize: toGroupLabel(raw.groupSize, raw.maxParticipants || raw.maxPax),
    neighborhood: String(raw.neighborhood || raw.location?.name || "Paris").trim(),
    description: String(raw.description || raw.shortDescription || raw.summary || "").trim(),
    highlights,
    coverImage,
    galleryImages: imageUrls.length > 1 ? imageUrls.slice(1, 5) : undefined,
    comingSoon: raw.comingSoon === true,
  };
}

async function loadOverrides() {
  try {
    const content = await readFile(overridesPath, "utf8");
    const parsed = JSON.parse(content);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function applyOverrides(tours, overrides) {
  return tours.map((tour) => {
    const override = overrides[tour.slug];
    if (!override || typeof override !== "object") {
      return tour;
    }

    return {
      ...tour,
      ...override,
      slug: tour.slug,
    };
  });
}

async function fetchBokunTours() {
  if (!apiUrl) {
    if (syncRequired) {
      throw new Error("BOKUN_TOURS_API_URL is required when BOKUN_SYNC_REQUIRED=true");
    }

    console.log("[bokun-sync] BOKUN_TOURS_API_URL not set. Keeping existing generated tours.");
    return null;
  }

  const headers = {
    accept: "application/json",
  };

  if (apiToken) {
    headers.authorization = `Bearer ${apiToken}`;
  }

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  if (customHeadersJson) {
    const customHeaders = JSON.parse(customHeadersJson);
    if (customHeaders && typeof customHeaders === "object") {
      Object.assign(headers, customHeaders);
    }
  }

  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    throw new Error(`[bokun-sync] Failed to fetch tours (${response.status} ${response.statusText})`);
  }

  const payload = await response.json();
  const items = selectItems(payload);
  const mapped = items.map(mapBokunTour).filter(Boolean);

  if (mapped.length === 0) {
    throw new Error("[bokun-sync] No tours could be mapped from Bokun payload");
  }

  return mapped;
}

async function main() {
  const fetchedTours = await fetchBokunTours();
  if (!fetchedTours) {
    return;
  }

  const overrides = await loadOverrides();
  const merged = applyOverrides(fetchedTours, overrides);

  await writeFile(generatedPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`[bokun-sync] Wrote ${merged.length} tours to src/data/tours.generated.json`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
