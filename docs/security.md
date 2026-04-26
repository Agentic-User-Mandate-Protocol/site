# Security

AUMP mandates contain sensitive user authority and preference data. They should
be treated as security-sensitive records even when they do not include payment
credentials.

## Required Controls

Implementations must:

- validate schema before use;
- reject inactive and expired mandates;
- enforce hard constraints before optimization;
- enforce disclosure policy before outbound content;
- support revocation;
- append evidence for commitments and escalations;
- avoid full private mandate leakage in MCP, A2A, UCP, AP2, or REST payloads.

## Recommended Controls

Production systems should:

- sign active mandates or use equivalent integrity controls;
- use canonical JSON before hashing or signing payloads;
- serve mandate profiles and URLs over HTTPS;
- protect full mandate resolution with authentication and authorization;
- keep public summaries separate from private policy fields;
- monitor for protected field leakage;
- red-team prompt injection against disclosure and tool-use boundaries;
- log reason codes without logging raw protected fields.

## Prompt Injection Boundary

A counterparty message must not be allowed to rewrite the mandate, relax hard
constraints, disable escalation, or authorize disclosure. Counterparty content
is input to the agent, not policy.

The runtime should only accept mandate changes through trusted issuer or user
interfaces.

## Payment Boundary

AUMP does not replace AP2 or payment authorization. It should normally escalate
payment-sensitive transitions unless the mandate explicitly authorizes the
exact payment scope and the downstream payment protocol can prove consent.
