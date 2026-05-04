# cat99sky

Medusa v2 headless e-commerce backend for the Cat99Sky store.

## Quick Start

```bash
# Install dependencies
yarn install

# Copy env template
cp .env.template .env

# Start PostgreSQL
service postgresql start

# Run database migrations
npx medusa db:migrate

# Seed demo data (optional)
npx medusa exec ./src/scripts/seed.ts

# Create admin user
npx medusa user -e admin@cat99sky.com -p yourpassword

# Start development server
npx medusa develop
```

- **API**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app
- **Store API**: http://localhost:9000/store (requires `x-publishable-api-key` header)

## Storefront Integration

Your v0/Vercel storefront needs:
1. `MEDUSA_BACKEND_URL` → your Medusa server URL
2. `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` → from Admin → Settings → API Key Management
3. All store API requests require the `x-publishable-api-key` header
