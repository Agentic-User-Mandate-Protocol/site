# Conformance Suite

The conformance repository is the runnable contract for AUMP implementations.
It is intentionally separate from the SDKs so no single SDK becomes the protocol
oracle.

Repository:

```text
https://github.com/Agentic-User-Mandate-Protocol/conformance
```

## Native Runner

```bash
go run ./cmd/aump-conformance validate fixtures
```

Expected result:

```text
AUMP v0.1 conformance v0.1.0 (spec 0.1.0)
29/29 passed
```

The Go runner is the primary executable. A Python parity runner is included for
SDK authors and cross-checking.

## Fixture Categories

| Category | Purpose |
| --- | --- |
| Schema | Valid and invalid mandates, profiles, and action evaluation payloads. |
| Mandate | Active, inactive, expired, and malformed mandate behavior. |
| Action | Budget, currency, authority, disclosure, confidence, and escalation decisions. |
| Evidence | Evidence event schema, mandate matching, retention policy, and private-field leakage rejection. |
| Bridge | MCP, A2A, and UCP/AP2 metadata boundaries. |

## Report Formats

```bash
go run ./cmd/aump-conformance validate fixtures --format json --output report.json
go run ./cmd/aump-conformance validate fixtures --format junit --output junit.xml
```

SDKs should run the fixture manifest in CI and compare their evaluator output
against expected decisions and reason codes.

## What Conformance Proves

Conformance proves that independent implementations agree on:

- schema validity;
- lifecycle rejection;
- action decisions;
- reason codes;
- canonical evidence event validity;
- evidence mandate-reference matching;
- evidence retention and private-field leakage rejection;
- SDK-level evidence semantic validation;
- bridge metadata validity;
- private mandate leakage rejection.

## What Conformance Does Not Prove

Conformance does not prove that an LLM negotiates well, finds the best deal, or
fully captures user taste. It proves that the implementation enforces the AUMP
contract around the agent.

Agent behavior should be tested with examples, simulations, red-team scenarios,
and production observability on top of conformance.
