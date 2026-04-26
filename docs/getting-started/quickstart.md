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
uv run aump-conformance validate
```

After the first package release, the same command is available as a globally
installed tool:

```bash
uv tool install aump-conformance
aump-conformance validate
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

After package publishing is configured:

```bash
uv tool install aump
aump evaluate-action \
  --mandate mandate.json \
  --action action.json
```

## 3. Evaluate an Action in TypeScript

```bash
cd aump-js
npm install
npm test
```

The TypeScript tests consume the same conformance fixture corpus.

After package publishing is configured:

```bash
npx @agentic-user-mandate-protocol/aump validate mandate mandate.json
npx @agentic-user-mandate-protocol/aump evaluate-action \
  --mandate mandate.json \
  --action action.json
```

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

After package publishing is configured:

```bash
uv tool install aump-examples
aump-examples marketplace
```

## What This Proves

Conformance proves implementation agreement on protocol behavior. The examples
prove that a deterministic agent runtime can wire AUMP into a real action loop,
including outbound A2A mandate references and inbound hash validation.

It does not prove that every LLM will negotiate well. That is a separate
application-quality problem. AUMP proves the control boundary around the agent.
