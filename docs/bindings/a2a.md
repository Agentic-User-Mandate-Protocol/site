# A2A Binding

AUMP composes with A2A as an extension. The A2A message carries an AUMP
reference, not the full private mandate.

## Extension URI

Current SDKs and conformance fixtures use:

```text
https://agentic-user-mandate-protocol.github.io/spec/bindings/a2a/v0.1
```

The extension is optional by default. A2A clients activate it per request when
they want mandate metadata attached to the message.

## Agent Card Declaration

An A2A Agent Card can advertise AUMP support in `capabilities.extensions`:

```json
{
  "capabilities": {
    "extensions": [
      {
        "uri": "https://agentic-user-mandate-protocol.github.io/spec/bindings/a2a/v0.1",
        "required": false,
        "params": {
          "versions": ["0.1.0"]
        }
      }
    ]
  }
}
```

## Message Metadata

Messages activate the extension with the `A2A-Extensions` header and include
extension-scoped metadata:

```json
{
  "headers": {
    "A2A-Extensions": "https://agentic-user-mandate-protocol.github.io/spec/bindings/a2a/v0.1"
  },
  "message": {
    "messageId": "msg_123",
    "extensions": [
      "https://agentic-user-mandate-protocol.github.io/spec/bindings/a2a/v0.1"
    ],
    "metadata": {
      "https://agentic-user-mandate-protocol.github.io/spec/bindings/a2a/v0.1": {
        "mandate_id": "aump_mnd_market_buyer_001",
        "mandate_hash": "sha256-...",
        "version": "0.1.0"
      }
    }
  }
}
```

## Privacy Rule

A2A messages must not embed the full private mandate. The conformance suite has
an invalid fixture for full mandate leakage.

## Runtime Pattern

1. Evaluate the proposed outbound A2A message.
2. Attach extension-scoped AUMP reference metadata only if the action is
   allowed.
3. Record the A2A message ID in evidence.
4. Deny or escalate before sending if protected data or commitment rules apply.
