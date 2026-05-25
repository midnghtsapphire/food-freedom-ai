# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- revvel-standards documentation set (`DEPLOYMENT_GUIDE.md`, `GO_TO_MARKET.md`, `BRAND_GUIDELINES.md`, `SECURITY.md`)
- baseline standards validation script at `scripts/validate-standards.js`
- assets + artifacts documentation (`ASSETS_INVENTORY.md`, `ARTIFACTS.md`)

### Changed
- `npm test` now includes standards validation so baseline requirements do not regress
- revvel-standards validator now enforces `RESEARCH_ENGINE.md`, `ASSETS_INVENTORY.md`, and `ARTIFACTS.md`
