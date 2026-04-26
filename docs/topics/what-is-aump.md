# What is AUMP?

AUMP, the Agentic User Mandate Protocol, defines a portable mandate for agents
that act on behalf of a human, household, organization, or other principal.

The mandate says what the agent may pursue, what it must not reveal, what it may
concede, what it must escalate, and what evidence it must keep. The protocol is
designed for systems where agents negotiate, buy, sell, delegate, or coordinate
with other agents without a human approving every intermediate message.

## The Gap

Modern agentic protocols cover critical infrastructure:

- MCP standardizes tool and context access.
- A2A standardizes agent discovery and agent-to-agent communication.
- UCP standardizes commerce capabilities, checkout, cart, catalog, and order
  surfaces.
- AP2 standardizes payment authorization and payment evidence.

Those layers do not fully answer the representation question: what authority did
the user give this agent before it acted?

AUMP fills that gap by making the user mandate portable and testable.

## What AUMP Controls

An AUMP implementation evaluates proposed actions before they become external
effects. Examples include:

- sending an A2A offer;
- calling an MCP tool;
- revealing a private preference or reservation price;
- accepting a deal;
- creating a checkout cart;
- creating or handing off an AP2 payment mandate;
- recording an evidence event;
- escalating to a trusted user interface.

## What AUMP Does Not Control

AUMP intentionally does not define:

- payment execution;
- checkout state machines;
- transport security already owned by HTTPS, OAuth, MCP, A2A, UCP, or AP2;
- model internals or chain-of-thought disclosure;
- a universal user utility function;
- merchant-of-record obligations.

This boundary matters. AUMP should be small enough to compose with existing
protocols but strict enough to block unauthorized action.

## Why It Matters

Agent-to-agent commerce and delegation create a representation problem. A user
may be satisfied with an outcome while still not knowing whether their agent
overpaid, disclosed private information, missed a better option, or committed
outside scope. AUMP makes those boundaries explicit and gives SDKs and runtimes
a conformance target.

## Minimum Runtime Contract

Every conforming runtime must be able to answer:

1. Which mandate was active?
2. Which proposed action was evaluated?
3. Which decision was returned?
4. Which mandate fields or policies caused the decision?
5. Which downstream protocol reference was used?
6. Which evidence event proves the runtime followed the decision?
