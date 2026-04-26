# Action Evaluation

`evaluate_action` is the core AUMP operation. It evaluates a proposed action
against an active mandate before the agent creates an external effect.

## Request Shape

```json
{
  "aump": {
    "version": "0.1.0",
    "type": "action_evaluation_request"
  },
  "mandate_ref": {
    "id": "aump_mnd_market_buyer_001",
    "version": "0.1.0"
  },
  "proposed_action": {
    "type": "accept_deal",
    "summary": "Accept 19 ping pong balls for 3 USD.",
    "counterparty": "seller_agent_001",
    "amount": {
      "currency": "USD",
      "total_minor": 300
    },
    "commitment": true
  },
  "context": {
    "confidence": 0.92
  }
}
```

## Response Shape

```json
{
  "aump": {
    "version": "0.1.0",
    "type": "action_evaluation_response"
  },
  "mandate_ref": {
    "id": "aump_mnd_market_buyer_001",
    "version": "0.1.0"
  },
  "decision": "allowed",
  "reason_codes": [],
  "paths": [],
  "summary": "Action allowed."
}
```

## Decision Semantics

| Decision | Meaning |
| --- | --- |
| `allowed` | The runtime may take the action. |
| `requires_escalation` | The runtime must pause and request trusted review. |
| `denied` | The runtime must block the action. |

Denial outranks escalation. If an action both violates a hard constraint and
matches an escalation condition, the action is denied.

## Standard Reason Codes

| Code | Meaning |
| --- | --- |
| `mandate_inactive` | Mandate status is not active. |
| `mandate_expired` | Mandate is past `expires_at`. |
| `scope_violation` | Action is outside allowed purpose or permissions. |
| `hard_constraint_violation` | A hard constraint failed. |
| `price_above_budget` | Amount exceeds budget. |
| `currency_mismatch` | Amount currency does not match mandate budget. |
| `disclosure_denied` | Action reveals protected or unallowed information. |
| `escalation_required` | Escalation condition matched. |
| `confidence_below_threshold` | Runtime confidence is below mandate threshold. |

## Runtime Requirement

The evaluator must be deterministic for the same mandate, action, context, and
time. LLM judgment can propose actions and summaries, but deterministic code
must perform the final policy decision.
