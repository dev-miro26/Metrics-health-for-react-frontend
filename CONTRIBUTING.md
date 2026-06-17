# Contributing

## File & folder naming

The codebase currently mixes conventions. New code should follow:

- **Components / pages**: PascalCase file names that match the default export
  (e.g. `Dashboard.js` exporting `Dashboard`).
- **Hooks**: `use-thing.js` (kebab-case, `use` prefix).
- **Utilities / slices / actions**: camelCase (e.g. `setAuthToken.js`,
  `metricsSlice.js`).
- **Folders**: kebab-case.

Existing files should be migrated toward this convention opportunistically to
avoid large, churny renames in one PR.
