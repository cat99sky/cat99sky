# cat99sky

Medusa v2 电商平台 — monorepo (Backend + Storefront)

## 项目结构

```
cat99sky/
├── apps/
│   ├── backend/          # Medusa v2 后端 (端口 9000)
│   └── storefront/       # Next.js 前端 (端口 3000)
├── scripts/              # 部署和数据库工具
├── package.json          # Yarn workspaces root
└── railway.json          # Railway 部署配置
```

## 快速开始

```bash
# 安装所有依赖
yarn install

# 启动 PostgreSQL
service postgresql start

# 数据库迁移 (首次)
cd apps/backend && npx medusa db:migrate

# 种子数据 (首次)
cd apps/backend && npx medusa exec ./src/scripts/seed.ts

# 创建管理员 (首次)
cd apps/backend && npx medusa user -e admin@cat99sky.com -p yourpassword

# 同时启动 backend + storefront
yarn dev
```

| 服务 | 地址 |
|------|------|
| Store API | http://localhost:9000/store |
| Admin 管理后台 | http://localhost:9000/app |
| Storefront 前端 | http://localhost:3000 |

## 单独启动

```bash
yarn dev:backend      # 仅启动后端
yarn dev:storefront   # 仅启动前端
```

## Storefront 联调

storefront 通过 Medusa JS SDK 连接后端，需要设置：
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` → 后端地址
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` → API Key (Admin → Settings)
