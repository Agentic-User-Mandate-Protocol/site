# Roadmap

AUMP is early. The current implementation proves the core control boundary, but
enterprise adoption needs a larger surface.

## Done

- Draft v0.1 specification.
- JSON Schemas for mandate, profile, and action evaluation.
- MCP, A2A, and UCP/AP2 binding drafts.
- Native Go conformance runner.
- Python conformance parity runner.
- Python SDK with runtime helpers.
- TypeScript SDK with policy and bridge helpers.
- Marketplace proof example.
- Cloudflare-hosted documentation site.

## Near Term

- Publish richer schema reference pages.
- Add full REST binding examples.
- Add mandate signing examples and canonical JSON guidance.
- Add revocation freshness fixtures.
- Add evidence event schema and conformance cases.
- Add negative prompt-injection fixtures for protected field leakage.
- Add CI badges and release tags across all repos.
- Add package publishing workflow for Python and TypeScript.

## Enterprise Track

- SDK tiering and support policy.
- Security threat model.
- SOC-style deployment checklist.
- OpenTelemetry semantic conventions for AUMP decisions.
- Mandate authority service reference architecture.
- Multi-agent delegation and sub-mandate patterns.
- Human-trusted review UI examples.

## Ecosystem Track

- Align A2A extension URI with final public domain.
- Publish UCP metadata extension examples.
- Publish AP2 boundary examples for intent, cart, and payment mandates.
- Add MCP Inspector walkthrough for `aump.evaluate_action`.
- Add conformance badges for third-party implementations.
