# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-09-12
### Major Release: MUI v5 & Webpack Updates

- **Material-UI Migration:**
  - Migrated all components to Material-UI v5 (`@mui/material`, `@mui/icons-material`).
  - Removed legacy MUI v4 packages (`@material-ui/core`, `@material-ui/icons`, `@material-ui/lab`).
  - Updated component styles and imports for MUI v5 compatibility.

- **Build System & Webpack:**
  - Updated all webpack configs for compatibility with Webpack 4 and modern plugins.
  - Switched to `mini-css-extract-plugin` for CSS extraction in production builds.
  - Integrated `terser-webpack-plugin` for optimized JS minification.
  - Cleaned up and modernized build scripts in `package.json`.

---
Older changes are not tracked in this file. For previous history, refer to commit logs.
