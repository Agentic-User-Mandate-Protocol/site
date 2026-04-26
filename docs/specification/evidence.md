# Evidence Events

Evidence events explain what the agent did under a mandate and why the runtime
allowed, denied, or escalated the step.

The canonical schema is:

```text
schemas/evidence-event.schema.json
```

## Event Principles

- Append evidence for material negotiation steps, disclosures, refusals,
  escalations, and commitments.
- Store summaries and hashes instead of raw private content by default.
- Include downstream protocol references when an action reached another system.
- Keep evidence access controlled because even summaries can reveal preference
  and negotiation strategy.

## Minimal Event Shape

```json
{
  "aump": {
    "version": "0.1.0",
    "type": "evidence_event"
  },
  "id": "aump_ev_deal_accepted_001",
  "mandate_ref": {
    "id": "aump_mnd_market_buyer_001",
    "hash": "sha256-e27c2259f3135f02e1803950caacd8a28504b06ef47c081844e068199dee8c52",
    "version": "0.1.0"
  },
  "sequence": 1,
  "created_at": "2026-04-25T18:00:00Z",
  "event_type": "deal_accepted",
  "summary": "Accepted 19 ping pong balls for 3 USD after AUMP evaluation returned allowed.",
  "result": "allowed",
  "actor": {
    "role": "runtime",
    "id": "example-marketplace-runtime"
  },
  "reason_codes": [],
  "downstream_refs": [
    {
      "protocol": "mcp",
      "id": "call_1"
    }
  ],
  "privacy": {
    "retention": "hashes",
    "contains_private_fields": false,
    "redaction": "hash"
  }
}
```

## Recommended Fields

| Field | Purpose |
| --- | --- |
| `id` | Stable event identifier. |
| `mandate_ref.id` | Mandate used for the decision. |
| `mandate_ref.hash` | Integrity binding to the private mandate. |
| `event_type` | Kind of action or decision. |
| `result` | `allowed`, `requires_escalation`, `denied`, `received`, `recorded`, or `error`. |
| `reason_codes` | Deterministic reasons. |
| `action.hash` | Hash of proposed action payload. |
| `downstream_refs` | Protocol-specific IDs. |
| `created_at` | Timestamp. |
| `privacy.contains_private_fields` | Whether the event retains protected data. |

## Semantic Checks

Conformance now validates more than shape:

- `mandate_ref.id` must match the mandate being evaluated;
- `mandate_ref.hash` must match the mandate payload;
- `event_type` must be required by the mandate evidence policy;
- `privacy.retention` must match the mandate evidence retention mode;
- private fields are rejected unless the mandate explicitly allows
  `full_transcript` retention.

## Evidence and Privacy

Evidence is not a dumping ground for prompts. Runtimes should avoid storing raw
LLM chain-of-thought, private user notes, payment credentials, or protected
reservation values unless a separate policy explicitly requires it.
