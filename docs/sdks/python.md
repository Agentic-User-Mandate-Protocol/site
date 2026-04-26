# Python SDK

Repository:

```text
https://github.com/Agentic-User-Mandate-Protocol/aump-py
```

## Install in Workspace

```bash
cd aump-py
uv sync
```

## Install as a Tool

After package publishing is configured:

```bash
uv tool install aump
aump --help
```

Standard Python installation works as well:

```bash
pip install aump
```

## Validate a Mandate

```bash
uv run aump validate mandate ../conformance/fixtures/mandates/marketplace-buyer.valid.json
```

Validate an evidence event against its mandate:

```bash
uv run aump validate-evidence \
  --mandate ../conformance/fixtures/mandates/marketplace-buyer.valid.json \
  --event ../conformance/fixtures/events/deal-accepted.valid.json
```

Validate bridge metadata:

```bash
uv run aump validate-bridge a2a_message ../conformance/fixtures/bridges/a2a-message-mandate-ref.valid.json
```

## Evaluate an Action

```bash
uv run aump evaluate-action \
  --mandate ../conformance/fixtures/mandates/marketplace-buyer.valid.json \
  --action ../conformance/fixtures/actions/accept-ping-pong.allowed.json
```

## Runtime Example

```python
from aump import AumpRuntime
from aump.policy import parse_datetime

runtime = AumpRuntime(
    mandates={"aump_mnd_market_buyer_001": mandate},
    now=parse_datetime("2026-04-25T18:00:00Z"),
)

decision = runtime.evaluate_action("aump_mnd_market_buyer_001", action)
if decision["decision"] == "allowed":
    tool_call = runtime.mcp_tool_call(
        tool_name="merchant.accept_offer",
        mandate_id="aump_mnd_market_buyer_001",
        arguments={"offer_id": "offer_123"},
    )
```

## A2A Runtime Helper

```python
outbound = runtime.a2a_message(
    "aump_mnd_market_buyer_001",
    message_id="msg_offer_001",
    role="user",
    parts=[{"text": "I can offer 3 USD."}],
)

validation = runtime.validate_a2a_message(outbound)
assert validation["valid"]
```

`validate_a2a_message` checks bridge shape, extracts the mandate reference, and
detects hash mismatches when the referenced mandate is available to the runtime.

## Test

```bash
uv run ruff check .
uv run pytest
uv build
uv run twine check dist/*
```

The test suite prefers sibling `conformance/fixtures` when the full workspace is
cloned. It falls back to a pinned fixture snapshot so the SDK can validate
itself independently.
