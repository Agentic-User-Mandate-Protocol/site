# Release and Publishing

AUMP packages are designed for registry publishing through OIDC trusted
publishing, not long-lived package tokens.

## Package Names

| Repository | Registry | Package | Workflow |
| --- | --- | --- | --- |
| `aump-py` | PyPI | `aump` | `.github/workflows/publish.yml` |
| `conformance` | PyPI | `aump-conformance` | `.github/workflows/publish.yml` |
| `examples` | PyPI | `aump-examples` | `.github/workflows/publish.yml` |
| `aump-js` | npm | `@agentic-user-mandate-protocol/aump` | `.github/workflows/publish.yml` |

## Required Registry Setup

Before creating the first GitHub release, configure trusted publishers in the
registries:

- PyPI projects: owner `Agentic-User-Mandate-Protocol`, repository
  `aump-py`, `conformance`, or `examples`, workflow
  `.github/workflows/publish.yml`, environment `pypi`.
- npm package: owner `Agentic-User-Mandate-Protocol`, repository `aump-js`,
  workflow `.github/workflows/publish.yml`, environment `npm`.

The workflows already request `id-token: write` in the publishing jobs and do
not use `PYPI_API_TOKEN` or `NPM_TOKEN`.

Official references:

- [PyPI trusted publishing](https://docs.pypi.org/trusted-publishers/using-a-publisher/)
- [GitHub OIDC with PyPI](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-pypi)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers)
- [GitHub npm package publishing](https://docs.github.com/actions/tutorials/publish-packages/publish-nodejs-packages)

## Release Order

1. Release `aump-py`.
2. Release `conformance`.
3. Release `aump-js`.
4. Release `examples` after `aump` and `aump-conformance` are available on
   PyPI, because `aump-examples` depends on both packages.

Each release is triggered by publishing a GitHub release for the matching
repository. Use the package version as the tag, for example `v0.1.0`.

## Public Repository Integration CI

The `examples` repository checks out the public `aump-py` and `conformance`
repositories as siblings in CI, then builds all three wheels and runs the
installed `aump-examples marketplace` proof from a clean virtual environment.

This proves the example package works the way an external adopter would install
and run it, without relying on private workspace state.

## Post-Release Smoke Checks

```bash
uv tool install aump
aump --help

uv tool install aump-conformance
aump-conformance validate

uv tool install aump-examples
aump-examples marketplace

npx @agentic-user-mandate-protocol/aump --help
```
