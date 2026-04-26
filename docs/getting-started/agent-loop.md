# Agent Loop Integration

An agentic system should use AUMP as a runtime guardrail, not as prompt text
alone. The LLM can plan, but the runtime decides whether a proposed action is
allowed.

## Basic Loop

```mermaid
sequenceDiagram
  participant User
  participant Agent
  participant Runtime as AUMP Runtime
  participant Tool as MCP or A2A or UCP
  participant Log as Evidence Log

  User->>Agent: Delegated task
  Agent->>Runtime: Resolve active mandate
  Agent->>Runtime: evaluate_action(proposed_action)
  Runtime-->>Agent: allowed | requires_escalation | denied
  alt allowed
    Agent->>Tool: Execute downstream call with AUMP reference
    Agent->>Log: Append evidence
  else requires_escalation
    Agent->>User: Ask through trusted UI
    Agent->>Log: Append escalation evidence
  else denied
    Agent->>Log: Append denial evidence
  end
```

## Python Shape

```python
decision = runtime.evaluate_action(mandate_id, proposed_action)

if decision["decision"] == "allowed":
    result = await call_tool_or_agent(proposed_action)
elif decision["decision"] == "requires_escalation":
    result = await request_trusted_review(decision)
else:
    result = {"blocked": True, "reason_codes": decision["reason_codes"]}

runtime.append_evidence(
    mandate_id,
    "material_action_evaluated",
    proposed_action["summary"],
    decision["decision"],
    {"reason_codes": decision["reason_codes"]},
)
```

## TypeScript Shape

```ts
const decision = evaluateAction(mandate, proposedAction, { now, context });

if (decision.decision === "allowed") {
  await callToolOrAgent(proposedAction);
} else if (decision.decision === "requires_escalation") {
  await requestTrustedReview(decision);
} else {
  return { blocked: true, reason_codes: decision.reason_codes };
}
```

## Material Action Checklist

Call `evaluate_action` before:

- outbound A2A messages that include offers, acceptance, commitments, or private
  details;
- MCP tool calls that change external state or expose private context;
- UCP checkout, cart, or order transitions;
- AP2 intent, cart, or payment mandate handoff;
- any disclosure derived from protected mandate fields;
- any step that consumes budget, creates liability, or changes user-facing
  obligations.

## Prompting Is Not Enforcement

Prompt text can explain the user's wishes to a model, but it cannot provide a
deterministic audit boundary. AUMP enforcement must happen in code, outside the
LLM output channel.
