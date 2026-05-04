# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This is a **Medusa v2** e-commerce backend (`cat99sky`). It serves as the headless API for a storefront hosted on v0/Vercel.

### Prerequisites (already in update script)
- **Node.js v20+** (via nvm: `source /home/ubuntu/.nvm/nvm.sh && nvm use 20`)
- **PostgreSQL 16** — must be running before the Medusa server starts
- **yarn** (classic v1) — lockfile is `yarn.lock`

### Starting services

1. **Start PostgreSQL** (if not already running):
   ```
   service postgresql start
   ```
2. **Start Medusa dev server**:
   ```
   source /home/ubuntu/.nvm/nvm.sh && nvm use 20
   cd /workspace && npx medusa develop
   ```
   Server runs at `http://localhost:9000`, Admin UI at `http://localhost:9000/app`.

### Key commands
| Action | Command |
|--------|---------|
| Dev server | `npx medusa develop` |
| Build | `npx medusa build` |
| DB migrate | `npx medusa db:migrate` |
| Seed data | `npx medusa exec ./src/scripts/seed.ts` |
| Create admin user | `npx medusa user -e <email> -p <password>` |
| Unit tests | `yarn test:unit` |
| Integration tests (HTTP) | `yarn test:integration:http` |
| Integration tests (modules) | `yarn test:integration:modules` |

### CORS / Storefront integration
CORS is configured in `.env` via `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`. The storefront needs the **publishable API key** (found in Admin → Settings → API Key Management, or query `api_key` table).

All store API requests require the header: `x-publishable-api-key: <key>`.

### Gotchas
- Redis is not configured; Medusa falls back to a fake in-memory Redis and local event bus. This is fine for development.
- The `.env` file is git-ignored. Copy `.env.template` and fill in values when setting up fresh.
- `npx medusa develop` watches files and restarts automatically; no manual restart needed after code changes.
- After adding new modules or changing DB schema, run `npx medusa db:migrate` before restarting.
