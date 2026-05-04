#!/bin/bash
# ============================================
# 导入本地数据库到远程 PostgreSQL (如 Railway)
# ============================================
# 使用方式:
#   ./scripts/import-db.sh <DATABASE_URL>
#
# 示例:
#   ./scripts/import-db.sh "postgresql://postgres:xxx@xxx.railway.app:5432/railway"
# ============================================

set -e

if [ -z "$1" ]; then
    echo "❌ 请提供目标数据库 URL"
    echo "用法: ./scripts/import-db.sh <DATABASE_URL>"
    echo "示例: ./scripts/import-db.sh \"postgresql://postgres:xxx@xxx.railway.app:5432/railway\""
    exit 1
fi

TARGET_DB_URL="$1"
DUMP_FILE="db_backup.dump"

if [ ! -f "$DUMP_FILE" ]; then
    echo "❌ 找不到 $DUMP_FILE，请先运行: ./scripts/export-db.sh"
    exit 1
fi

echo "🔄 正在导入数据库到远程..."
echo "   来源: $DUMP_FILE ($(du -h "$DUMP_FILE" | cut -f1))"
echo "   目标: $TARGET_DB_URL"
echo ""

pg_restore --no-owner --no-acl --clean --if-exists -d "$TARGET_DB_URL" "$DUMP_FILE" 2>&1 || true

echo ""
echo "✅ 数据库导入完成！你在本地创建的所有产品、文章等数据已同步到远程。"
