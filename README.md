# Real Paris Tours Website

Modern Next.js website for selling guided walking tours in Paris.

## Features

- Home page with hero, featured tours, testimonials, and booking CTA
- Tours listing and dynamic tour detail pages
- About, Contact, Booking redirect, and FAQ pages
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

## Booking

Booking is handled on the external hosted site at `https://book.realparis.tours`.

Local development does not require any booking-specific environment variables.
