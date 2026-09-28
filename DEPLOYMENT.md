# Deployment: Cloudflare Pages

Recommended production architecture:

- Source: GitHub repository
- Host/CDN: Cloudflare Pages
- Custom hostname: `data-learning.rossellaarcucci.com`
- DNS provider: can remain IONOS

## Cloudflare Pages build settings

- Production branch: `main`
- Framework preset: Docusaurus
- Build command: `npm run build`
- Build output directory: `build`
- Root directory: repository root

The repository pins Node.js with `.node-version`.

## Docusaurus URL settings

The production site is served at the root of the custom subdomain, so:

```ts
url: 'https://data-learning.rossellaarcucci.com',
baseUrl: '/',
```

## Runtime data

`papers_min.json` and `ai_papers_min.json` are web assets, and must be present in the repository.

## Custom domain

Cloudflare will provide the Pages hostname to use as the target of a CNAME record.
