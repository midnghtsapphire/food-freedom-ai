# Security Policy

## Supported Scope

This repository includes:
- Vite/React frontend
- FastAPI backend
- Stripe billing logic
- authentication and user data flows

## Reporting a Vulnerability

If you discover a security issue, report it privately to the maintainers before public disclosure. Include:
- affected file/path
- reproduction steps
- impact assessment
- suggested mitigation (if available)

## Security Baseline

- Never commit `.env` files; only commit `.env.example`
- Keep dependencies updated (`npm audit`, Python dependency review)
- Protect API routes with authentication unless explicitly public
- Validate and sanitize user inputs in frontend and backend boundaries
