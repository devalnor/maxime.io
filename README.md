<h1 align="center">maxime.io</h1>
<h3 align="center">
  <a href="https://maxime.io/">Visit the website</a> 
</h3>



## Development

The project uses Astro 7 and pins Node.js and pnpm through Volta.

* `pnpm install`
* `pnpm dev`
* `pnpm check`
* `pnpm build`

## Tools used

* **Framework**: [Astro](https://astro.build/)
* **Package manager**: [pnpm](https://pnpm.io/)
* **Styling and motion**: native CSS and a local Three.js particle portrait

The Astro pages implement the approved `prototypes/cuivre-rose` mockup. Shared
navigation and footer live in `src/components`, with styles in
`src/styles/global.css`. The portrait modules, precomputed point data and vendored Three.js
(including its license) live in `public/static/portrait`; its production defaults
are in `portrait-settings.mjs`. The tuning panel remains in the prototype.

Portrait source images stay locally in the ignored `source-assets/portrait/`
directory. To regenerate the committed runtime data, install Pillow locally
(`python3 -m pip install Pillow`) and run `python3 scripts/precompute-portrait.py`.
Normal builds need only the generated `portrait-mobile.bin` and
`portrait-desktop.bin`; no image decoding or sampling happens in the browser.
`.vercelignore` also excludes source assets, prototypes and local artifacts from
deployment uploads. This does not remove files from old Git history or deployments.

  
## Contact
Maxime de Visscher - <a href="https://www.linkedin.com/in/maximedevisscher">LinkedIn</a>


## License
Copyright © 2020–2026 Macoal.
