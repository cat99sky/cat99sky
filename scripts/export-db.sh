#!/bin/bash
# ============================================
# 导出本地 PostgreSQL 数据库
# ============================================
# 使用方式:
#   ./scripts/export-db.sh
# ============================================

set -e

DUMP_FILE="db_backup.dump"
DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/medusa_db}"

echo "🔄 正在导出本地数据库..."
echo "   来源: $DB_URL"
echo "   目标: $DUMP_FILE"

PGPASSWORD=postgres pg_dump -U postgres -h localhost -d medusa_db --no-owner --no-acl -F c -f "$DUMP_FILE"

echo "✅ 数据库导出完成！文件: $DUMP_FILE ($(du -h "$DUMP_FILE" | cut -f1))"
echo ""
echo "要导入到 Railway，运行:"
echo "  ./scripts/import-db.sh <RAILWAY_DATABASE_URL>"
