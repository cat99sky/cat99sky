# AGENTS.md

## Cursor Cloud specific instructions

### Overview
Monorepo for **Cat99Sky** e-commerce platform: Medusa v2 backend + Next.js storefront.

### Project structure
```
apps/backend/    — Medusa v2 API + Admin (port 9000)
apps/storefront/ — Next.js 15 + Tailwind (port 3000)
scripts/         — DB export/import and deploy helpers
```

### Prerequisites
- **Node.js v20+** via nvm: `source /home/ubuntu/.nvm/nvm.sh && nvm use 20`
- **PostgreSQL 16** must be running: `service postgresql start`
- **yarn** (classic v1) — root lockfile manages all workspaces

### Starting services
```bash
# Both at once
yarn dev

# Or separately
yarn dev:backend
yarn dev:storefront
```

### Key commands (from repo root)
| Action | Command |
|--------|---------|
| Install all deps | `yarn install` |
| Dev (both) | `yarn dev` |
| Build backend | `yarn build:backend` |
| Build storefront | `yarn build:storefront` |
| DB migrate | `cd apps/backend && npx medusa db:migrate` |
| Seed data | `cd apps/backend && npx medusa exec ./src/scripts/seed.ts` |
| Create admin | `cd apps/backend && npx medusa user -e <email> -p <pass>` |
| Lint (storefront) | `yarn lint` |
| Tests (backend) | `yarn test` |

### Gotchas
- **Medusa requires its own node_modules** — backend uses `nohoist` in yarn workspaces. If you see `Cannot find module` errors from Medusa CLI, run `yarn install` from root.
- **Backend .env** lives at `apps/backend/.env`, not root. Copy from `apps/backend/.env.template`.
- **Storefront .env.local** lives at `apps/storefront/.env.local` with `NEXT_PUBLIC_MEDUSA_BACKEND_URL` and `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.
- Redis not configured in dev — Medusa falls back to in-memory. Fine for development.
- `npx medusa develop` hot-reloads backend on file changes.
- Next.js dev server hot-reloads storefront on file changes.
