# Governance

AUMP needs governance that matches its role as a cross-protocol authority layer.
The protocol should evolve through specification changes, fixture changes, and
SDK behavior changes together.

## Current Repositories

| Repository | Responsibility |
| --- | --- |
| `spec` | Normative prose, schemas, bindings, examples, and test vectors. |
| `conformance` | Runnable contract for implementations. |
| `aump-py` | Python SDK and reference runtime. |
| `aump-js` | TypeScript SDK. |
| `examples` | Runnable integration proofs. |
| `site` | Public documentation. |

## Change Discipline

Protocol changes should include:

1. Specification update.
2. Schema update when payload shape changes.
3. Conformance fixture update.
4. SDK implementation update.
5. Example update when behavior changes.
6. Documentation update.

## Versioning

The v0.1 line should remain strict and small. Breaking changes should move to a
new protocol version and fixture manifest version. SDKs should report the AUMP
version they implement and the conformance fixture version they passed.

## Extension Direction

AUMP should use reverse-domain or URL-scoped identifiers for extension points so
vendors can add private policy domains without colliding with the core
protocol.
