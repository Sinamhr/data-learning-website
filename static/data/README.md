# Runtime data

The Docusaurus wizard fetches these files in the visitor's browser:

- `schema.json`
- `papers_min.json`
- `ai_schema.json`
- `ai_papers_min.json`

`papers_min.json` and `ai_papers_min.json` therefore need to be committed (or otherwise generated during the build) for Git-connected Cloudflare Pages deployments.

**Important:** anything in `static/` is copied into the published site and is publicly downloadable. Do not put confidential, private, or restricted data here.
