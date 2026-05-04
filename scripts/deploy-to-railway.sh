#!/bin/bash
# ============================================
# Cat99Sky — Railway 一键部署脚本
# ============================================
# 前置条件: 安装 Railway CLI (npm i -g @railway/cli) 并登录 (railway login)
#
# 使用方式:
#   chmod +x scripts/deploy-to-railway.sh
#   ./scripts/deploy-to-railway.sh
# ============================================

set -e

echo "🚀 Cat99Sky Railway 部署脚本"
echo "==========================="

# 检查 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "❌ 请先安装 Railway CLI: npm i -g @railway/cli"
    echo "   然后运行: railway login"
    exit 1
fi

echo ""
echo "📋 部署步骤说明:"
echo "  1. 登录 Railway 网页 (https://railway.app)"
echo "  2. 新建项目 → 选择 'Deploy from GitHub repo' → 选择 cat99sky/cat99sky"
echo "  3. 在项目中添加 PostgreSQL 服务 (点 + New → Database → PostgreSQL)"
echo "  4. 在项目中添加 Redis 服务 (点 + New → Database → Redis)"
echo "  5. 在 Medusa 服务的 Variables 中设置以下环境变量:"
echo ""
echo "     DATABASE_URL     → 引用 PostgreSQL 服务的连接串 (\${{Postgres.DATABASE_URL}})"
echo "     REDIS_URL        → 引用 Redis 服务的连接串 (\${{Redis.REDIS_URL}})"
echo "     STORE_CORS       → 你的 storefront URL (如 https://xxx.vercel.app)"
echo "     ADMIN_CORS       → Railway Medusa URL (部署后填)"
echo "     AUTH_CORS        → storefront + Medusa URL (逗号分隔)"
echo "     JWT_SECRET       → $(openssl rand -hex 32)"
echo "     COOKIE_SECRET    → $(openssl rand -hex 32)"
echo "     MEDUSA_WORKER_MODE → shared"
echo "     MEDUSA_BACKEND_URL  → Railway Medusa URL (部署后填)"
echo ""
echo "  6. 部署成功后，如需导入本地数据，运行:"
echo "     ./scripts/import-db.sh <RAILWAY_DATABASE_URL>"
echo ""
echo "✅ railway.json 已配置好，Railway 会自动识别并使用。"
