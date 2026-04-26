# MCP Binding

AUMP composes with MCP by exposing mandate evaluation as a tool boundary and by
carrying safe mandate references in request metadata.

## Tool

The canonical MCP tool name is:

```text
aump.evaluate_action
```

The tool should advertise:

```json
{
  "name": "aump.evaluate_action",
  "annotations": {
    "readOnlyHint": true,
    "destructiveHint": false,
    "idempotentHint": true
  }
}
```

The tool is read-only because it evaluates policy. It must not itself perform
the downstream action.

## Metadata Keys

Current SDKs and conformance fixtures use these `_meta` keys:

| Key | Meaning |
| --- | --- |
| `org.agentic-user-mandate-protocol/aump_mandate_id` | Mandate identifier. |
| `org.agentic-user-mandate-protocol/aump_mandate_hash` | Hash of the mandate used for the decision. |
| `org.agentic-user-mandate-protocol/aump_version` | AUMP version. |

## Tool Call Example

```json
{
  "jsonrpc": "2.0",
  "id": "call_1",
  "method": "tools/call",
  "params": {
    "name": "merchant.create_offer",
    "_meta": {
      "org.agentic-user-mandate-protocol/aump_mandate_id": "aump_mnd_market_buyer_001",
      "org.agentic-user-mandate-protocol/aump_mandate_hash": "sha256-...",
      "org.agentic-user-mandate-protocol/aump_version": "0.1.0"
    },
    "arguments": {
      "offer_id": "offer_123"
    }
  }
}
```

## Reserved Metadata Rule

AUMP metadata must not use MCP-reserved prefixes. The conformance suite rejects
payloads that place AUMP keys under reserved MCP namespaces.

## Runtime Pattern

1. Resolve the active mandate.
2. Evaluate the proposed tool action.
3. If allowed, call the MCP tool with AUMP reference metadata.
4. Append evidence with the tool call ID and evaluator decision.
