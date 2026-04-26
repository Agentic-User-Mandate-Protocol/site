# UCP and AP2 Binding

AUMP does not replace UCP or AP2. It supplies the user mandate boundary before a
commerce or payment action is handed to those protocols.

## UCP Position

UCP describes commerce capabilities such as checkout, cart, catalog, identity
linking, and order flows. AUMP decides whether the user's agent is allowed to
take the proposed commerce step.

Example UCP metadata:

```json
{
  "meta": {
    "ucp-agent": {
      "profile": "https://platform.example/profiles/shopping-agent.json"
    },
    "aump": {
      "mandate_id": "aump_mnd_shop_001",
      "mandate_hash": "sha256-...",
      "version": "0.1.0"
    }
  },
  "checkout": {
    "id": "checkout_123",
    "status": "buyer_review_required"
  }
}
```

## AP2 Position

AP2 handles payment mandates and payment accountability. AUMP handles the
broader representation mandate that says whether the agent may reach the AP2
boundary at all.

Payment-sensitive actions should usually require escalation unless the active
mandate explicitly authorizes the exact payment boundary.

## Namespace Rule

AUMP references should live in the surrounding commerce metadata, not inside the
AP2 namespace. The current conformance suite rejects payloads that place AUMP
under the `ap2` namespace.

## Checkout-Ready Boundary

A common AUMP policy is:

```text
create cart or negotiate terms -> allowed within mandate
checkout ready or payment authorization -> requires_escalation
```

This lets the agent do useful commerce work while preserving trusted user
confirmation at the point where liability or payment authority changes.

## Privacy Rule

UCP/AP2 payloads must not embed the full private mandate. They should carry a
mandate ID, hash, version, and optionally an access-controlled mandate URL.
