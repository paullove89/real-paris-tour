import { readFile, writeFile } from "node:fs/promises";
import crypto from "node:crypto";
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
const bokunAccessKey = process.env.BOKUN_ACCESS_KEY;
const bokunSecretKey = process.env.BOKUN_SECRET_KEY;
const customHeadersJson = process.env.BOKUN_REQUEST_HEADERS_JSON;
const syncRequired = process.env.BOKUN_SYNC_REQUIRED === "true";

function toBokunUtcDate(value = new Date()) {
  const pad = (num) => String(num).padStart(2, "0");
  return `${value.getUTCFullYear()}-${pad(value.getUTCMonth() + 1)}-${pad(value.getUTCDate())} ${pad(
    value.getUTCHours()
  )}:${pad(value.getUTCMinutes())}:${pad(value.getUTCSeconds())}`;
}

function addBokunSignatureHeaders(headers, url, method = "GET") {
  if (!bokunAccessKey || !bokunSecretKey) {
    return;
  }

  const parsed = new URL(url);
  const requestPath = `${parsed.pathname}${parsed.search}`;
  const bokunDate = toBokunUtcDate();
  const signaturePayload = `${bokunDate}${bokunAccessKey}${method.toUpperCase()}${requestPath}`;
  const signature = crypto.createHmac("sha1", bokunSecretKey).update(signaturePayload, "utf8").digest("base64");

  headers["x-bokun-date"] = bokunDate;
  headers["x-bokun-accesskey"] = bokunAccessKey;
  headers["x-bokun-signature"] = signature;
}

function getBokunHeaders(url, method = "GET") {
  const headers = {
    accept: "application/json",
  };

  if (apiToken) {
    headers.authorization = `Bearer ${apiToken}`;
  }

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  addBokunSignatureHeaders(headers, url, method);

  if (customHeadersJson) {
    const customHeaders = JSON.parse(customHeadersJson);
    if (customHeaders && typeof customHeaders === "object") {
      Object.assign(headers, customHeaders);
    }
  }

  return headers;
}

async function fetchJsonFromUrl(url, method = "GET") {
  const headers = getBokunHeaders(url, method);
  const response = await fetch(url, {
    headers,
    method,
    redirect: "manual",
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location") || "(missing location header)";
    throw new Error(
      `[bokun-sync] BOKUN_TOURS_API_URL redirected (${response.status}) to ${location}. ` +
        "Use a direct Bokun JSON API endpoint, not an Extranet/login URL."
    );
  }

  if (!response.ok) {
    throw new Error(`[bokun-sync] Failed to fetch tours (${response.status} ${response.statusText})`);
  }

  const contentType = response.headers.get("content-type") || "";
  const bodyText = await response.text();

  if (!contentType.toLowerCase().includes("application/json")) {
    const preview = bodyText.slice(0, 140).replace(/\s+/g, " ").trim();
    throw new Error(
      `[bokun-sync] Expected JSON but got '${contentType || "unknown"}'. ` +
        `Response preview: ${preview || "(empty response)"}`
    );
  }

  try {
    return JSON.parse(bodyText);
  } catch {
    throw new Error("[bokun-sync] Response was not valid JSON");
  }
}

function extractActivityIds(payload) {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const suppliers = Array.isArray(payload.suppliers) ? payload.suppliers : [];
  const ids = suppliers.flatMap((supplier) =>
    Array.isArray(supplier?.activityIds) ? supplier.activityIds : []
  );

  return [...new Set(ids.map((id) => Number(id)).filter((id) => Number.isFinite(id) && id > 0))];
}

function normalizeSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodeHtmlEntities(value) {
  return String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripHtmlToText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return decodeHtmlEntities(value)
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(value, max = 220) {
  const text = String(value || "").trim();
  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, max).replace(/\s+\S*$/, "").trim()}...`;
}

function parseNumericAmount(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return NaN;
  }

  const cleaned = value
    .replace(/[^0-9,.-]/g, "")
    .replace(/,(?=\d{1,2}$)/, ".")
    .replace(/,/g, "");
  const amount = Number(cleaned);
  return Number.isFinite(amount) ? amount : NaN;
}

function firstFiniteNumber(values) {
  for (const value of values) {
    const amount = parseNumericAmount(value);
    if (Number.isFinite(amount)) {
      return amount;
    }
  }

  return NaN;
}

function extractPricesFromObject(obj) {
  if (!obj || typeof obj !== "object") {
    return [];
  }

  return Object.values(obj)
    .map((value) => parseNumericAmount(value))
    .filter((value) => Number.isFinite(value));
}

function toPriceEur(raw) {
  const directCandidates = [
    raw.priceEur,
    raw.nextDefaultPrice,
    raw.nextDefaultPriceMoney?.amount,
    raw.defaultPrice,
    raw.price?.amount,
    raw.price?.value,
    raw.pricing?.fromPrice,
    raw.fromPrice,
    raw.startingPrice,
    raw.nextDefaultPriceAsText,
  ];

  const direct = firstFiniteNumber(directCandidates);
  if (Number.isFinite(direct) && direct > 0) {
    return Math.round(direct);
  }

  const categoryPrices = extractPricesFromObject(raw.pricesByCategory);
  if (categoryPrices.length > 0) {
    return Math.round(Math.min(...categoryPrices));
  }

  const ratePrices = Array.isArray(raw.rates)
    ? raw.rates.flatMap((rate) => [
        parseNumericAmount(rate?.price),
        parseNumericAmount(rate?.amount),
        ...extractPricesFromObject(rate?.pricesByCategory),
      ])
    : [];

  const finiteRatePrices = ratePrices.filter((value) => Number.isFinite(value) && value > 0);
  if (finiteRatePrices.length > 0) {
    return Math.round(Math.min(...finiteRatePrices));
  }

  return 0;
}

function extractListItemsFromHtml(value) {
  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  const matches = [...value.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
  return matches
    .map((match) => stripHtmlToText(match[1]))
    .map((item) => item.replace(/^[-•\s]+/, "").trim())
    .filter((item) => item.length >= 4);
}

function sentenceHighlights(value, max = 4) {
  const text = stripHtmlToText(value);
  if (!text) {
    return [];
  }

  return text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 18)
    .slice(0, max);
}

function toPreferredSlug(raw, title) {
  if (typeof raw.slug === "string" && raw.slug.trim()) {
    return normalizeSlug(raw.slug);
  }

  if (typeof raw.externalId === "string" && raw.externalId.trim()) {
    const normalizedExternal = normalizeSlug(raw.externalId);
    if (normalizedExternal && !/^\d+$/.test(normalizedExternal)) {
      return normalizedExternal;
    }
  }

  const normalizedTitle = normalizeSlug(title);
  if (/bike|cycling/.test(normalizedTitle) && /paris/.test(normalizedTitle)) {
    return "bike-highlights-paris";
  }

  if (/real-paris-tour/.test(normalizedTitle)) {
    return "the-real-paris-tour";
  }

  if (normalizedTitle && !/^\d+$/.test(normalizedTitle)) {
    return normalizedTitle;
  }

  return normalizeSlug(`tour-${raw.id || title}`);
}

function toDurationLabel(rawDuration, durationMinutes, durationHours, durationDays, durationWeeks, durationText) {
  if (typeof durationText === "string" && durationText.trim()) {
    return durationText.trim();
  }

  if (typeof rawDuration === "string" && rawDuration.trim()) {
    return rawDuration.trim();
  }

  const durationFromParts =
    Number(durationMinutes || 0) +
    Number(durationHours || 0) * 60 +
    Number(durationDays || 0) * 24 * 60 +
    Number(durationWeeks || 0) * 7 * 24 * 60;

  const minutes = Number(durationFromParts);
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
        return image.url || image.src || image.imageUrl || image.originalUrl || image.original || image.cleanUrl;
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

  const slug = toPreferredSlug(raw, title);
  if (!slug) {
    return null;
  }

  const imageUrls = toImageUrls(raw.images || raw.gallery || raw.photos || raw.keyPhoto?.derived);
  const coverImage =
    raw.coverImage ||
    raw.image?.url ||
    raw.imageUrl ||
    raw.mainImage ||
    raw.keyPhoto?.originalUrl ||
    raw.keyPhoto?.url ||
    imageUrls[0] ||
    undefined;

  const priceEur = toPriceEur(raw);

  const rawDescription = raw.description || raw.shortDescription || raw.summary || raw.excerpt;
  const cleanedDescription = stripHtmlToText(rawDescription);
  const cleanedSummary = truncateText(stripHtmlToText(raw.excerpt || raw.summary || raw.shortDescription || rawDescription));

  const explicitHighlights = toHighlights(raw.highlights).map(stripHtmlToText).filter(Boolean);
  const descriptionHighlights = toHighlights(raw.descriptionHighlights).map(stripHtmlToText).filter(Boolean);
  const listHighlights = extractListItemsFromHtml(raw.description || raw.summary || "");

  const highlights =
    explicitHighlights.length > 0
      ? explicitHighlights
      : descriptionHighlights.length > 0
        ? descriptionHighlights
        : listHighlights.length > 0
          ? listHighlights.slice(0, 6)
          : sentenceHighlights(raw.excerpt || raw.summary || raw.description);

  const fallbackGroupMax =
    raw.maxParticipants ||
    raw.maxPax ||
    raw.maxPerBooking ||
    raw.rates?.find?.((rate) => Number.isFinite(Number(rate?.maxPerBooking)))?.maxPerBooking;

  return {
    slug,
    title: String(title).trim(),
    duration: toDurationLabel(
      raw.duration,
      raw.durationMinutes || raw.lengthMinutes,
      raw.durationHours,
      raw.durationDays,
      raw.durationWeeks,
      raw.durationText
    ),
    priceEur,
    groupSize: toGroupLabel(raw.groupSize, fallbackGroupMax),
    neighborhood: String(raw.neighborhood || raw.location?.name || "Paris").trim(),
    description: cleanedDescription,
    summary: cleanedSummary || truncateText(cleanedDescription),
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

  const payload = await fetchJsonFromUrl(apiUrl);
  let items = selectItems(payload);

  if (items.length === 0) {
    const ids = extractActivityIds(payload);
    if (ids.length > 0) {
      console.log(`[bokun-sync] Retrieved ${ids.length} active activity IDs, fetching full activity data...`);
      const listByIdUrl = new URL("/activity.json/list-by-id", apiUrl);
      listByIdUrl.searchParams.set("ids", ids.join(","));
      const detailsPayload = await fetchJsonFromUrl(listByIdUrl.toString());
      items = selectItems(detailsPayload);
    }
  }

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
