# Artifacts

## Product Artifacts

- Responsive React website at `/` with:
  - hero positioning and conversion CTA
  - dietary intake/restriction capture
  - deterministic 7-day meal plan generation and rendering
- FastAPI backend with auth/billing route modules in `server/routes/`

## Research Artifacts

- `RESEARCH_ENGINE.md` documenting the deterministic research engine behavior
- `GO_TO_MARKET.md` documenting value, audience, launch motion, and KPIs

## Quality + Standards Artifacts

- `scripts/validate-standards.js` automated baseline revvel-standards validator
- `npm test` pipeline running lint, build, and standards validation
- `CHANGELOG.md`, `SECURITY.md`, and `DEPLOYMENT_GUIDE.md` for operational readiness

## Deployment Artifacts

- Vercel website deployment flow in `DEPLOYMENT_GUIDE.md`
- Dockerized backend build/runtime artifacts via `Dockerfile` + `docker-compose.yml`
