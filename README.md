# Food Freedom AI

AI-powered nutrition and meal planning

## Features

- ✅ Vite + React + TypeScript frontend
- ✅ FastAPI backend with full REST API
- ✅ PostgreSQL database with SQLAlchemy ORM
- ✅ JWT authentication + Google OAuth
- ✅ Dual-mode Stripe billing (test/live)
- ✅ Redis caching
- ✅ Docker + docker-compose setup
- ✅ OpenAI integration for AI features

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ and npm
- Python 3.11+ (for local development)

### Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials (do not commit `.env`)
3. Start the backend (API + Postgres + Redis) with Docker Compose:

```bash
docker-compose up -d
```

4. Start the frontend:

```bash
npm ci
npm run dev
```

5. Access the API at `http://localhost:8004`
6. API docs at `http://localhost:8004/docs`
7. Frontend dev server at `http://localhost:5173`

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run database migrations
# (TODO: Add Alembic migrations)

# Start development server
uvicorn server.main:app --reload --port 8004
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- (More endpoints in `/docs`)

## Environment Variables

See `.env.example` for all required environment variables.

### Frontend (Vite)

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Stripe Dual Mode

The app supports both Stripe test and live modes. Set `STRIPE_MODE=test` or `STRIPE_MODE=live` in your `.env` file.

## Tech Stack

- **Frontend:** Vite, React 18, TypeScript, Tailwind (shadcn/ui)
- **Backend:** FastAPI, Python 3.11
- **Database:** PostgreSQL 15
- **Cache:** Redis 7
- **Auth:** JWT + Google OAuth
- **Payments:** Stripe
- **AI:** OpenAI API
- **Deployment:** Docker, docker-compose

## License

Proprietary - All rights reserved

## Support

For support, email support@example.com
