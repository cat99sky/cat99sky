#!/bin/bash
set -e

DUMP_FILE="db_backup.dump"
DB_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/medusa_db}"

echo "Exporting local database..."
PGPASSWORD=postgres pg_dump -U postgres -h localhost -d medusa_db --no-owner --no-acl -F c -f "$DUMP_FILE"

echo "Done: $DUMP_FILE ($(du -h "$DUMP_FILE" | cut -f1))"
echo "Import to Railway: ./scripts/import-db.sh <RAILWAY_DATABASE_URL>"
