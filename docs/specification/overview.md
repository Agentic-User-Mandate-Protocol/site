# Specification Overview

AUMP v0.1 defines:

- a mandate object;
- an optional profile document at `/.well-known/aump`;
- an action evaluation operation;
- evidence event expectations;
- bridge metadata rules for MCP, A2A, UCP, AP2, REST, and platform-native
  transports;
- conformance levels for parsers, policy evaluators, and runtimes.

The canonical specification repository is:

```text
https://github.com/Agentic-User-Mandate-Protocol/spec
```

## Normative Source

For v0.1:

- `spec.md` defines protocol behavior.
- `schemas/mandate.schema.json` defines mandate payload shape.
- `schemas/profile.schema.json` defines profile payload shape.
- `schemas/action-evaluation.schema.json` defines action evaluation payloads.
- `schemas/evidence-event.schema.json` defines evidence event payloads.

If prose and schema conflict, implementations should follow the stricter
requirement until the conflict is resolved.

## Keywords

The key words `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`, `SHALL NOT`, `SHOULD`,
`SHOULD NOT`, `RECOMMENDED`, `MAY`, and `OPTIONAL` are interpreted as described
in RFC 2119 and RFC 8174.

## Abstract Operations

| Operation | Purpose |
| --- | --- |
| Create Mandate | Create a draft mandate from intake data. |
| Present Mandate | Present a user-readable summary before activation. |
| Evaluate Action | Decide whether a proposed action is allowed, denied, or requires escalation. |
| Append Evidence | Record an audit event for material steps. |
| Revoke Mandate | Stop autonomous action under a mandate. |
| Resolve Mandate | Retrieve an active mandate or safe reference by ID, hash, or URL. |

## Conformance Levels

| Level | Requirement |
| --- | --- |
| Level 1 Parser | Parse and validate mandates and reject inactive or expired mandates. |
| Level 2 Policy Evaluator | Perform Level 1 checks and return deterministic action decisions. |
| Level 3 Runtime | Perform Level 2 checks, enforce revocation, append schema-valid evidence, and carry AUMP references through at least one binding. |
