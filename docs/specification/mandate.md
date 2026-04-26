# Mandate Object

An AUMP mandate binds a principal to an agent under a specific purpose and set
of authority, preference, negotiation, disclosure, escalation, and evidence
rules.

## Required Top-Level Fields

| Field | Purpose |
| --- | --- |
| `aump.version` | Protocol version. |
| `id` | Stable mandate identifier. |
| `status` | Lifecycle state. |
| `issued_at` | Issuance timestamp. |
| `expires_at` | Expiration timestamp. |
| `principal` | Represented party. |
| `agent` | Agent or runtime bound to the mandate. |
| `purpose` | Task and domain boundary. |
| `authority` | Autonomy, permissions, prohibitions, and objective bounds. |
| `preferences` | Soft and hard user preferences. |
| `negotiation` | Bargaining policy and protected negotiation fields. |
| `disclosure` | What mandate-derived data may be revealed. |
| `escalation` | Conditions requiring trusted review. |
| `evidence` | Event recording and retention expectations. |

## Authority Example

```json
{
  "authority": {
    "mode": "delegated",
    "permissions": ["make_offer", "accept_deal", "send_message"],
    "prohibited_actions": ["share_payment_credentials"],
    "budget": {
      "currency": "USD",
      "max_total_minor": 500
    },
    "requires_trusted_ui_for_commitment": false
  }
}
```

## Disclosure Example

```json
{
  "disclosure": {
    "default": "deny",
    "public_summary": "Buyer is looking for low-cost creative supplies.",
    "allowed": [
      {
        "field": "purpose.summary",
        "to": "counterparty"
      }
    ],
    "prohibited": [
      {
        "field": "negotiation.reservation_price"
      },
      {
        "field": "preferences.private_notes"
      }
    ]
  }
}
```

## Validation Requirements

Before autonomous action, implementations must:

- validate the mandate schema;
- reject non-active states;
- reject expired mandates;
- verify delegated authority has objective bounds;
- enforce prohibited actions;
- enforce budget and currency limits;
- evaluate disclosure before outbound content;
- evaluate escalation before commitments.
