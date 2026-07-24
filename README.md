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

## GitHub Pages

The site is configured as a static export for GitHub Pages.

1. In your GitHub repository, go to Settings > Pages.
2. Set the source to GitHub Actions.
3. Push to the default branch. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) will build and publish the exported site.

## Booking Integrations

The site now supports a provider-aware booking hub. You can surface direct Bokun checkout links as well as Viator and Tripadvisor marketplace links.

Public environment variables:

```bash
NEXT_PUBLIC_BOKUN_BOOKING_URL=https://book.realparis.tours
NEXT_PUBLIC_VIATOR_BOOKING_URL=
NEXT_PUBLIC_TRIPADVISOR_BOOKING_URL=

NEXT_PUBLIC_BOKUN_BIKE_HIGHLIGHTS_URL=
NEXT_PUBLIC_VIATOR_BIKE_HIGHLIGHTS_URL=
NEXT_PUBLIC_TRIPADVISOR_BIKE_HIGHLIGHTS_URL=

NEXT_PUBLIC_BOKUN_REAL_PARIS_URL=
NEXT_PUBLIC_VIATOR_REAL_PARIS_URL=
NEXT_PUBLIC_TRIPADVISOR_REAL_PARIS_URL=
```

Tour-specific URLs override the generic provider URLs when present. This is useful if each tour has its own Bokun product page or marketplace listing.

Local development does not require booking-specific environment variables unless you want to test the provider links.
