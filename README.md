# Real Paris Tours Website

Modern Next.js website for selling guided walking tours in Paris.

## Features

- Home page with hero, featured tours, testimonials, and booking CTA
- Tours listing and dynamic tour detail pages
- About, Contact, and FAQ pages
- Reusable UI components and sample tour data
- TypeScript, App Router, Tailwind CSS, and ESLint setup

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

`npm run build` runs a prebuild sync that can pull tour data from Bokun and write `src/data/tours.generated.json`.

## Bokun Source Of Truth

Tour slugs, titles, descriptions, pricing, and other listing fields can be synced from Bokun at build time.

Commands:

```bash
npm run sync:tours
npm run build
```

The sync writes generated data to `src/data/tours.generated.json`, which is used by `src/data/tours.ts`.
Optional local tuning (images, highlights, neighborhood labels) can be added by slug in `src/data/tour-overrides.json`.

## Bokun Booking

All bookings are handled through Bokun URLs.

Public environment variables:

```bash
NEXT_PUBLIC_BOKUN_BOOKING_URL=

NEXT_PUBLIC_BOKUN_BIKE_HIGHLIGHTS_URL=

NEXT_PUBLIC_BOKUN_REAL_PARIS_URL=

BOKUN_TOURS_API_URL=
BOKUN_ACCESS_KEY=
BOKUN_SECRET_KEY=
BOKUN_API_TOKEN=
BOKUN_API_KEY=
BOKUN_REQUEST_HEADERS_JSON=
BOKUN_SYNC_REQUIRED=false
```

For Bokun REST v1, a good default is:

```bash
BOKUN_TOURS_API_URL=https://api.bokun.io/activity.json/active-ids
```

The sync script will use those IDs to fetch full activity details automatically.

Tour-specific URLs override the generic Bokun URL when present. If no Bokun URL is set, the site can route visitors to `/contact` instead.

Local development does not require Bokun sync variables unless you want live Bokun data during build.

## Daily Cloudflare Updates

The workflow `/.github/workflows/cloudflare-daily-deploy.yml` is configured to deploy once per day and can also be run manually.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `BOKUN_TOURS_API_URL`
- `BOKUN_ACCESS_KEY` and `BOKUN_SECRET_KEY` (recommended for Bokun REST v1 signature auth)
- `BOKUN_API_TOKEN` and/or `BOKUN_API_KEY` (depending on your Bokun auth method)
- `BOKUN_REQUEST_HEADERS_JSON` (optional)

For Bokun REST v1 access-key/secret-key auth, use `https://api.bokun.io` URLs and set
`BOKUN_ACCESS_KEY` + `BOKUN_SECRET_KEY`. The sync script will generate
`X-Bokun-Date`, `X-Bokun-AccessKey`, and `X-Bokun-Signature` automatically.
