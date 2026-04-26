# SDKs

AUMP currently has Python and TypeScript implementation repos. The conformance
suite has a native Go runner and Python parity runner.

| SDK | Repository | Current scope |
| --- | --- | --- |
| Python | [aump-py](https://github.com/Agentic-User-Mandate-Protocol/aump-py) | Schemas, semantic validation, action evaluation, bridge helpers, runtime, CLI. |
| TypeScript | [aump-js](https://github.com/Agentic-User-Mandate-Protocol/aump-js) | Schemas, semantic validation, action evaluation, bridge helpers. |
| Go | [conformance](https://github.com/Agentic-User-Mandate-Protocol/conformance) | Native conformance executable and reference policy behavior. |

## SDK Contract

Every SDK should:

- bundle the canonical schemas;
- validate mandates before use;
- reject inactive and expired mandates;
- evaluate actions deterministically;
- return stable decisions and reason codes;
- validate MCP, A2A, and UCP/AP2 bridge payloads;
- run the conformance fixture manifest in CI.

## Tier Direction

The current SDKs are early reference implementations. Enterprise adoption will
require SDK tiering similar to mature protocol ecosystems:

| Tier | Meaning |
| --- | --- |
| Tier 1 | Maintained, conformance-gated, documented, production-ready. |
| Tier 2 | Maintained but missing some runtime or enterprise features. |
| Tier 3 | Experimental or community-maintained. |

The immediate goal is to make Python and TypeScript Tier 1 candidates and keep
the Go conformance runner as the neutral contract.
