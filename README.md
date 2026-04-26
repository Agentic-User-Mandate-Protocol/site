# AUMP Site

Documentation website for the Agentic User Mandate Protocol.

The site is built with MkDocs Material, following the same broad documentation
shape used by mature agentic protocol projects: conceptual docs, normative
specification pages, transport bindings, SDK guides, conformance, enterprise
readiness, examples, security, governance, roadmap, and an LLM-readable entry.

## Develop

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements-docs.txt
mkdocs serve --dev-addr 127.0.0.1:4173
```

Then open `http://127.0.0.1:4173`.

## Build and Validate

```bash
mkdocs build --strict --site-dir public
python3 -m http.server --bind 127.0.0.1 --directory public 4173
```

The generated static site is written to `public/`, which is the Cloudflare
Workers Assets deploy directory.

## Cloudflare Deploy

```bash
mkdocs build --strict --site-dir public
npx --yes wrangler deploy
```
