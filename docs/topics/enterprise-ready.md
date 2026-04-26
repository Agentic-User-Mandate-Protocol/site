# Enterprise Ready

AUMP is designed to fit into enterprise agent systems without replacing the
security, identity, observability, or commerce protocols they already use.

## Enterprise Requirements

| Requirement | AUMP responsibility |
| --- | --- |
| Authentication | Bind mandate resolution and evidence access to authenticated callers. |
| Authorization | Enforce who may create, activate, revoke, evaluate, or inspect mandates. |
| Data minimization | Keep private mandate content out of counterparty payloads. |
| Auditability | Append evidence for material decisions and commitments. |
| Revocation | Stop autonomous action when mandates are revoked or superseded. |
| Observability | Emit trace and decision metadata without exposing private fields. |
| Change control | Version schemas, fixtures, SDK behavior, and conformance expectations. |

## Trust Boundaries

An enterprise deployment should separate:

- mandate issuance from model prompting;
- policy evaluation from LLM output parsing;
- private mandate fields from outbound protocol metadata;
- evidence summaries from raw private messages;
- payment authorization from user preference authority.

## Operational Controls

Production systems should add:

- mandate signing or equivalent integrity control;
- stable mandate hashes using canonical JSON;
- role-based access to full mandate data;
- short-lived delegated mandates for high-risk scopes;
- revocation propagation monitoring;
- conformance reports in CI;
- evidence retention policy;
- red-team tests for prompt injection and protected field leakage.

## Observability

Recommended telemetry fields:

| Field | Purpose |
| --- | --- |
| `aump.mandate_id` | Correlate action to policy. |
| `aump.mandate_hash` | Prove which private policy was used without exposing it. |
| `aump.version` | Track schema and evaluator behavior. |
| `aump.decision` | Operational decision signal. |
| `aump.reason_codes` | Debug and audit reason. |
| `downstream.protocol` | MCP, A2A, UCP, AP2, REST, or platform-native. |
| `downstream.id` | Tool call, message, checkout, or payment reference. |

Telemetry should not include protected fields unless an internal policy
explicitly permits it.
