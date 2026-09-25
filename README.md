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
- Phase 3 regional teams and a suggested activity sequence based on the supplied programme.

Online assessments and shared services require connectivity and may require access from their operators. This site does not collect patient information or completed assessment results. External links open in a new tab. Download needed documents before field travel; reference PDFs do not replace online submission.

## Source handling

The September 2026 activation brief controls the website workflow. Documents are reference content, not instructions for website administration. The March concept note supplies background. Earlier dates in the DG letter and weekly programme are explicitly distinguished from Phase 3 dates (27 September–3 October 2026).

Reporting documents are original supplied files. The facility template includes Akokoro/Apac example details and a sign-off name; the mission template includes Lango. Visible download notes and guide instructions tell teams to replace those entries. No attendance template was supplied; the guide specifies daily separate lists without inventing an official form.

The Phase 3 workbook was transformed into a public CSV of names, roles, support levels and regions. Personal phones and emails are excluded. The original workbook and working extraction files are not committed. Regional allocations are not facility-specific itineraries.

`scripts/prepare_resources.py` copies the selected local source material and regenerates `dist/data.js`. It requires Python and openpyxl and the original source directory (edit `SOURCE` when moving machines). Copies already in `dist/resources` allow the site to run without those sources. The script does not alter originals.

## Publish and update

GitHub Pages is deployed by `.github/workflows/deploy.yml` on pushes to `main`. Set repository Settings → Pages → Source to **GitHub Actions**. All site URLs use relative asset paths so the repository subpath works.

Edit `dist/app.js` for guide text and online links; `dist/styles.css` for design; `dist/data.js` for resource metadata and team data. Run a local preview, verify downloads and interactions, commit and push. Do not upload completed attendance sheets, patient records or private coordination contacts to this public repository.
