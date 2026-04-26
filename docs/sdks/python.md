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

## Validate a Mandate

```bash
uv run aump validate mandate ../conformance/fixtures/mandates/marketplace-buyer.valid.json
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

## Test

```bash
uv run ruff check .
uv run pytest
```

The test suite prefers sibling `conformance/fixtures` when the full workspace is
cloned. It falls back to a pinned fixture snapshot so the SDK can validate
itself independently.
