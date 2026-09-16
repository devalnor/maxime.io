# maxime.io

Personal website of Maxime de Visscher, Creative Technologist & UX Architect.
Built with Astro, TypeScript, CSS and Three.js. Deployed as a static site on Vercel.

## Development

Use Node.js **24.21.0** and pnpm **12.4.1**, pinned in `package.json` for Volta.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server runs at `http://localhost:4321`.

```sh
pnpm check    # Astro and TypeScript diagnostics
pnpm build    # Generate the static site in dist/
pnpm preview  # Preview the production build locally
```

## Project structure

| Directory | Contents |
| --- | --- |
| `src/pages/` | Home, Experience and Lab |
| `src/components/` | Navigation, footer, Lucide arrows and animated skill icons |
| `src/layouts/` | Shared HTML, metadata and structured data |
| `src/styles/` | Site styles, responsive layouts and page transitions |
| `public/` | Published images, fonts, robots.txt and sitemap |
| `public/static/portrait/` | Particle portrait, timeline tornado, point data and vendored Three.js |
| `scripts/` | Local portrait data generation |
| `docs/` | Content references and design notes |

`astro.config.mjs` sets the canonical site URL and redirects `/missions` to
`/experience/`. Update `public/sitemap.xml` when adding or renaming pages.

## Particle animations

The hero loads precomputed positions, brightness and sizes from
`portrait-mobile.bin` (6,500 points) or `portrait-desktop.bin` (11,500 points).
It does not download or analyze a source image. `portrait-settings.mjs` controls
its animation and pointer interaction. `timeline.js` renders the tornado beside
the career timeline. Both animations respect reduced-motion preferences.

To regenerate the portrait data locally, place the original image at
`source-assets/portrait/portrait.png`, install Pillow in your Python environment,
then run:

```sh
python3 scripts/precompute-portrait.py
```

Commit both generated `.bin` files after changing the portrait. A fresh checkout
can build and deploy without Python, Pillow or the source image.

## Deployment

`vercel.json` overrides the previous Next.js configuration with the Astro preset,
uses pnpm 12.4.1 for installation and build, and publishes `dist/`.
Pushes to a connected Vercel branch trigger deployments according to the project's
Git settings. Production branch and domain settings are managed in Vercel.

## Local files

`prototypes/`, `artifacts/`, `artifact/`, `.gstack/` and `source-assets/` are local
working directories excluded from Git and deployment uploads. Existing files are
preserved locally; they are not required to build the site. Retired public assets
are archived under `artifacts/legacy-public/`.

Ignoring or untracking files does not remove them from Git history or old
deployments. Point data remains publicly downloadable because the browser needs
it to render the portrait.

## Third-party licenses

- Three.js: `public/static/portrait/assets/vendor/LICENSE.three`
- Lucide / Feather icons: `public/static/licenses/lucide.txt`
- PT Mono: `public/static/licenses/pt-mono.txt`

Copyright © 2020–2026 Macoal.
