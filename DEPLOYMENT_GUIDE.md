# Deployment Guide

## 1. Platform

- **Website in Test:** Deploy preview and production to **Vercel**
- **API + data services:** Deploy with Docker-compatible infrastructure (or managed equivalents)

## 2. Required Environment Variables

Set all values from `.env.example` in your deployment provider:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- backend auth, Stripe, database, and OpenAI variables used by `server/config.py`

## 3. Frontend Deployment (Vercel)

1. Import repository into Vercel.
2. Set build command to `npm run build`.
3. Set output directory to `dist`.
4. Add environment variables from `.env.example`.
5. Enable preview deployments for pull requests.

## 4. Backend Deployment

1. Build backend image with project `Dockerfile`.
2. Provision PostgreSQL + Redis.
3. Configure runtime env vars for auth, Stripe, OpenAI, and database connectivity.
4. Run service on port `8004`.
5. Verify `GET /health` returns healthy status.

## 5. Post-Deploy Verification

Run after each deploy:

```bash
npm test
curl -fsS https://<api-domain>/health
```

Validate end-to-end flows:
- account registration/login
- meal plan generation
- billing route health
