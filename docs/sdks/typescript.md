# TypeScript SDK

Repository:

```text
https://github.com/Agentic-User-Mandate-Protocol/aump-js
```

## Install

```bash
cd aump-js
npm install
```

After package publishing is configured:

```bash
npm install @agentic-user-mandate-protocol/aump
npx @agentic-user-mandate-protocol/aump --help
```

## Evaluate an Action

```ts
import { evaluateAction, parseDate } from "@agentic-user-mandate-protocol/aump";

const result = evaluateAction(mandate, action, {
  now: parseDate("2026-04-25T18:00:00Z"),
  context: { confidence: 0.92 },
});

if (result.decision === "requires_escalation") {
  // Pause autonomous commitment and ask through a trusted UI.
}
```

## Validate Bridge Metadata

```ts
import { validateBridge } from "@agentic-user-mandate-protocol/aump";

const result = validateBridge(a2aMessage, "a2a_message");
if (!result.valid) {
  throw new Error(result.errors.join("; "));
}
```

## CLI

```bash
npx @agentic-user-mandate-protocol/aump validate mandate mandate.json
npx @agentic-user-mandate-protocol/aump validate-evidence \
  --mandate mandate.json \
  --event evidence-event.json
npx @agentic-user-mandate-protocol/aump validate-bridge a2a_message a2a-message.json
```

## Test

```bash
npm test
npm run lint
npm pack --dry-run --json
```

The tests consume the conformance fixture manifest and assert that TypeScript
behavior matches the protocol contract.
