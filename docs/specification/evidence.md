# Evidence Events

Evidence events explain what the agent did under a mandate and why the runtime
allowed, denied, or escalated the step.

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
  "index": 1,
  "mandate_id": "aump_mnd_market_buyer_001",
  "type": "material_action_evaluated",
  "summary": "Accepted 19 ping pong balls for 3 USD.",
  "result": "allowed",
  "refs": {
    "aump_reason_codes": [],
    "a2a_message_id": "msg_123",
    "mcp_tool_call_id": "call_1"
  }
}
```

## Recommended Fields

| Field | Purpose |
| --- | --- |
| `event_id` | Stable event identifier. |
| `mandate_id` | Mandate used for the decision. |
| `mandate_hash` | Integrity binding to the private mandate. |
| `event_type` | Kind of action or decision. |
| `decision` | `allowed`, `requires_escalation`, or `denied`. |
| `reason_codes` | Deterministic reasons. |
| `action_hash` | Hash of proposed action payload. |
| `downstream_refs` | Protocol-specific IDs. |
| `created_at` | Timestamp. |

## Evidence and Privacy

Evidence is not a dumping ground for prompts. Runtimes should avoid storing raw
LLM chain-of-thought, private user notes, payment credentials, or protected
reservation values unless a separate policy explicitly requires it.
