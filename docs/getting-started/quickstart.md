# Quickstart

This quickstart assumes the AUMP organization repositories are cloned as
siblings:

```text
projects/
  spec/
  conformance/
  aump-py/
  aump-js/
  examples/
  site/
```

## 1. Run the Conformance Contract

The native runner is Go:

```bash
cd conformance
go run ./cmd/aump-conformance validate fixtures
```

Expected output:

```text
AUMP v0.1 conformance v0.1.0 (spec 0.1.0)
29/29 passed
```

Python parity runner:

```bash
uv sync
uv run aump-conformance validate fixtures
```

## 2. Evaluate an Action in Python

```bash
cd aump-py
uv sync
uv run aump evaluate-action \
  --mandate ../conformance/fixtures/mandates/marketplace-buyer.valid.json \
  --action ../conformance/fixtures/actions/accept-ping-pong.allowed.json
```

The decision should be `allowed`.

## 3. Evaluate an Action in TypeScript

```bash
cd aump-js
npm install
npm test
```

The TypeScript tests consume the same conformance fixture corpus.

## 4. Run the Marketplace Proof

```bash
cd examples
uv sync
uv run aump-examples marketplace
```

The proof runs conformance first, then executes a deterministic buyer/seller
marketplace flow that validates A2A metadata, MCP metadata, protected
disclosure denial, budget denial, checkout escalation, and canonical evidence
events.

## What This Proves

Conformance proves implementation agreement on protocol behavior. The examples
prove that a deterministic agent runtime can wire AUMP into a real action loop.

It does not prove that every LLM will negotiate well. That is a separate
application-quality problem. AUMP proves the control boundary around the agent.
