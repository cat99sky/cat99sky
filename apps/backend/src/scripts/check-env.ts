const required = [
  "DATABASE_URL",
  "STORE_CORS",
  "ADMIN_CORS",
  "AUTH_CORS",
  "JWT_SECRET",
  "COOKIE_SECRET",
]

const recommended = [
  "REDIS_URL",
  "MEDUSA_BACKEND_URL",
]

const missing = required.filter((k) => !process.env[k])
const missingRec = recommended.filter((k) => !process.env[k])

if (missing.length) {
  console.error(`\n❌ Missing required env vars:\n${missing.map((k) => `   - ${k}`).join("\n")}\n`)
  process.exit(1)
}

if (missingRec.length) {
  console.warn(`\n⚠️  Missing recommended env vars (ok for dev, needed for production):\n${missingRec.map((k) => `   - ${k}`).join("\n")}\n`)
}

console.log("✅ Environment check passed")
