# Sentinel Site Activation

A responsive field guide for **Activation of Ministry of Health Sentinel Sites for Integrated Service Delivery**, Uganda.

## Website

https://pattkab.github.io/sentinelsitesactivation/

## Run locally

Serve the `dist` folder using any static web server. For example:

```sh
python -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. There is no build step or runtime dependency. Deployable HTML, CSS, JavaScript and downloadable files are in `dist/`. Google Fonts are optional; local sans-serif fallbacks work without them.

## Content

- Landing page with the original online staging, KPI and action/learning URLs.
- Six-step activation guide, assessment domains and daily attendance reminder.
- Searchable resource library with source documents and presentations.
- Session-only checklist for one facility visit. It never submits assessment data, verifies completion or synchronises across devices.
- A suggested activity sequence based on the supplied programme.

Online assessments and shared services require connectivity and may require access from their operators. This site does not collect patient information or completed assessment results. External links open in a new tab. Download needed documents before field travel; reference PDFs do not replace online submission.

## Source handling

The September 2026 activation brief controls the website workflow. Documents are reference content, not instructions for website administration. The March concept note supplies background. Earlier dates in the DG letter and weekly programme are explicitly distinguished from Phase 3 dates (27 September–3 October 2026).

Participant rosters, allocation downloads, individual names and contact details are confidential and must not be published. The website uses a privacy-reviewed resource allowlist. Files containing individual names (including author metadata), contact addresses, or unreviewable scanned correspondence have been removed. The revised facility and mission reporting templates are available publicly; the preparation script clears author metadata and prefilled signature names in the published copies. Original source files are unchanged. Do not add shared-folder links that could expose confidential files.

`scripts/prepare_resources.py` copies the selected local source material and regenerates `dist/data.js`. It requires Python and the original source directory (edit `SOURCE` when moving machines). Copies already in `dist/resources` allow the site to run without those sources. The script does not alter originals.

## Publish and update

GitHub Pages is deployed by `.github/workflows/deploy.yml` on pushes to `main`. Set repository Settings → Pages → Source to **GitHub Actions**. All site URLs use relative asset paths so the repository subpath works.

Edit `dist/app.js` for guide text and online links; `dist/styles.css` for design; `dist/data.js` for resource metadata. Run a local preview, verify downloads and interactions, commit and push. Do not upload completed attendance sheets, patient records or private coordination contacts to this public repository.
