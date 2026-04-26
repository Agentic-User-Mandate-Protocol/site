# Core Concepts

## Mandate

A mandate is a machine-readable representation contract. It binds a principal,
an agent, a purpose, authority limits, preferences, negotiation rules,
disclosure rules, escalation rules, and evidence requirements.

## Authority

Authority controls autonomy:

| Mode | Meaning |
| --- | --- |
| `advisory` | The agent may analyze and recommend, but cannot commit. |
| `supervised` | The agent may negotiate, but final commitment requires approval. |
| `delegated` | The agent may commit within explicit objective bounds. |

Delegated authority must have objective bounds such as a budget, allowed
categories, allowed counterparties, prohibited actions, or a time window.

## Hard Constraints and Soft Preferences

Hard constraints are enforcement rules. Soft preferences guide ranking and
style. A conforming evaluator enforces hard constraints before optimizing for
preferences.

## Protected Fields

Protected fields may be used for private decision-making but must not be
disclosed unless an allow rule matches. Examples:

- reservation price;
- private user notes;
- maximum budget;
- walk-away condition;
- sensitive preference explanation;
- internal risk score.

## Proposed Action

A proposed action is a structured candidate action created before an external
effect. The LLM may draft it, but the runtime evaluates it.

Example action:

```json
{
  "type": "accept_deal",
  "summary": "Accept 19 ping pong balls for 3 USD.",
  "counterparty": "seller_agent_001",
  "amount": {
    "currency": "USD",
    "total_minor": 300
  },
  "commitment": true
}
```

## Decision

`evaluate_action` returns one of three decisions:

| Decision | Runtime behavior |
| --- | --- |
| `allowed` | Proceed with the downstream action. |
| `requires_escalation` | Pause and ask through a trusted review channel. |
| `denied` | Do not take the action. |

## Evidence

Evidence events prove that the runtime enforced the mandate. Events should store
summaries, reason codes, downstream references, and hashes rather than raw
private content whenever possible.
