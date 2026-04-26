# Marketplace Proof

Repository:

```text
https://github.com/Agentic-User-Mandate-Protocol/examples
```

The marketplace proof demonstrates how AUMP fits into an agentic commerce flow.
It is deterministic so it can run in CI and fail when conformance fails.

## Run

```bash
cd examples
uv sync
uv run aump-examples marketplace
```

## Scenarios

The proof executes:

- buyer offers 3 USD for 19 ping pong balls under a delegated mandate;
- offer is sent as an A2A-shaped message with AUMP metadata;
- seller receives the message and records evidence;
- buyer accepts only after an MCP-shaped `aump.evaluate_action` decision is
  `allowed`;
- 7 USD offer is denied by the buyer budget;
- protected reservation-price disclosure is denied;
- UCP checkout-ready handoff returns `requires_escalation`;
- evidence is appended for material steps.

## Why This Matters

The proof shows the layer above conformance:

- conformance proves the implementation contract;
- the example proves a runtime can wire the contract into agent action;
- production systems still need model-quality evaluation, security testing,
  observability, and user experience validation.

## Transcript

```bash
uv run aump-examples marketplace --json --output transcript.json
```

Use transcripts as evidence artifacts when testing agent behavior across model
versions, prompt changes, or policy changes.
