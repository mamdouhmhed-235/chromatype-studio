# Chromatype Studio

A static design lab for generating, validating, and exporting accessible color palettes and font pairings.

## Features
- **Deterministic Generation**: Seeded random number generator ensures reproducible results.
- **Role-Based Palette**: Generates 11 color roles with contrast validation.
- **Font Pairing**: Curated font list with intelligent pairing logic.
- **Studio UI**: Split layout with Sidebar Controls, Real-time preview tabs (Website, App UI, Typography, Accessibility).
- **Export & Share**: URL State Sync for sharing, export to CSS/JSON/Tailwind.

## Running Locally
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Deployment
This project is set up for GitHub Pages.
1. Push to a GitHub repository.
2. Enable GitHub Pages in Settings > Pages (Source: GitHub Actions).
3. The `.github/workflows/deploy.yml` will automatically build and deploy.

## URL State
The URL encodes the `seed` and constraints (mode, harmony, vibe). Sharing the URL shares the exact generated configuration.
