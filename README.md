# changelogger

> ⚠️ **Archived / no longer maintained.** This project has been superseded by
> [**Changesets**](https://github.com/changesets/changesets), which solves the
> same problem (conflict-free changelogs) and has become the de-facto standard.
> **Please use Changesets instead.** See [Why this is archived](#why-this-is-archived).

A small CLI experiment for managing a JS/TS `CHANGELOG.md` without merge
conflicts. Each change was written to its own file in a `changes/` directory and
merged into the changelog at release time, so contributors never edited the same
file at the same time.

## Why this is archived

The idea here — one file per change, merged at release — is sound, but it is now
implemented far more completely by [Changesets](https://github.com/changesets/changesets):

- One markdown file per change in a `.changeset/` folder (no merge conflicts).
- Automatic [SemVer](https://semver.org/) bump detection (patch/minor/major).
- First-class **monorepo** support with linked/dependent package bumps.
- Automated publishing via the
  [Changesets GitHub Action](https://github.com/changesets/action).
- A large, active community and ecosystem.

Rather than maintain an overlapping tool, this repository is kept read-only for
reference only. It is **not published to npm** and receives no updates.

## Use Changesets instead

```bash
npm install --save-dev @changesets/cli
npx changeset init
```

Then, for each change:

```bash
npx changeset        # describe the change + pick a version bump
```

And at release time:

```bash
npx changeset version   # consume changesets, update versions + CHANGELOG.md
npx changeset publish   # publish to npm
```

Full docs: <https://github.com/changesets/changesets>.

### Other tools worth a look

- [`changesets`](https://github.com/changesets/changesets) — recommended; per-change files, great for monorepos.
- [`release-please`](https://github.com/googleapis/release-please) — automated releases driven by Conventional Commits.
- [`semantic-release`](https://github.com/semantic-release/semantic-release) — fully automated, commit-driven versioning and publishing.
- [`conventional-changelog`](https://github.com/conventional-changelog/conventional-changelog) — generate a changelog from your commit history.

## What it did (for reference)

The CLI offered four commands, built on `commander` + `inquirer`:

| Command | Alias | Description |
| --- | --- | --- |
| `initiate` | `i` | Create a new `CHANGELOG.md` scaffold. |
| `add` | `a` | Add a change as a new file in `changes/` via a prompt. |
| `list` | `ls` | Print the current `CHANGELOG.md`. |
| `merge` | `m` | Fold `changes/` entries into `CHANGELOG.md` under a version. |

The changelog format followed
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

> **Note:** this was a pre-release prototype and was never fully working — see the
> commit history and the original review notes. Treat the code as a reference, not
> a working tool.

## License

[MIT](./LICENSE) © CroCode BV
