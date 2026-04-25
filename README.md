# AUMP Site

Documentation website for the Agentic User Mandate Protocol.

This repo is intentionally static for the first public pass. Open
`index.html` directly in a browser, or serve the folder with any static server.

## What It Covers

- where AUMP fits beside MCP, A2A, UCP, and AP2;
- how to run the conformance contract;
- how the Python and TypeScript SDKs consume the conformance fixtures;
- what the marketplace proof demonstrates for agentic commerce;
- which outcomes are proven by conformance versus the runnable examples.

## Local Use

```bash
open index.html
```

Optional static server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Validation

```bash
node --check app.js
```

The site has no build step and no runtime dependencies.
