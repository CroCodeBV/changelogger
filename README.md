# changelogger

Manage your JS/TS changelog conflict free

## Test run

For now you can run the following commands to test the library:

```bash
node --experimental-specifier-resolution=node bin/index.js
```

## Commands

### List
  
  ```bash
  node --experimental-specifier-resolution=node bin/index.js list
  ```

  List all changes in the changelog

### Add

  ```bash
  node --experimental-specifier-resolution=node bin/index.js add
  ```

  Create a new temporary changelog entry in a new file using a dialog interface

### Merge

  ```bash
  node --experimental-specifier-resolution=node bin/index.js merge
  ```

  Merge all temporary changelog entries into the changelog.md file. Use this command after you have finished adding all changes during a release.
