You are a **senior full-stack developer**.

## 📌 Task

You are given a real-world code module located at:

```
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app
```

Refactor the entire codebase **without modifying any UI or changing behavior**. Instead, improve it using:

- ✅ Clear separation of concerns
- ✅ Consistent, semantic naming conventions
- ✅ Modular architecture (hooks, services, utils, components)
- ✅ Scalable file/folder structure
- ✅ Industry-standard project layout and architecture
- ✅ Readable, testable, production-grade code
- ✅ 100% behavior and API compatibility

👉 Output the refactored code to a new folder: `app_refactored`

Also return a `.sh` script that will:
- Create that folder
- Write all refactored files
- Run `git add` and `git commit` with message: `refactor: added improved app version`

---

## 🌲 Full Project Structure (cwd)

```bash
/home/sj/web/ph/cure_sync/cure_sync_backend
├── env.example
├── generated
│   └── prisma
│       ├── client.d.ts
│       ├── client.js
│       ├── default.d.ts
│       ├── default.js
│       ├── edge.d.ts
│       ├── edge.js
│       ├── index-browser.js
│       ├── index.d.ts
│       ├── index.js
│       ├── libquery_engine-debian-openssl-3.0.x.so.node
│       ├── package.json
│       ├── query_engine_bg.js
│       ├── query_engine_bg.wasm
│       ├── runtime
│       │   ├── edge-esm.js
│       │   ├── edge.js
│       │   ├── index-browser.d.ts
│       │   ├── index-browser.js
│       │   ├── library.d.ts
│       │   ├── library.js
│       │   ├── react-native.js
│       │   ├── wasm-compiler-edge.js
│       │   └── wasm-engine-edge.js
│       ├── schema.prisma
│       ├── wasm.d.ts
│       ├── wasm-edge-light-loader.mjs
│       ├── wasm.js
│       └── wasm-worker-loader.mjs
├── index.d.ts
├── index.d.ts.map
├── index.js
├── index.ts
├── package.json
├── pnpm-lock.yaml
├── prisma
│   ├── migrations
│   │   ├── 20251019130336_user_admin_done
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
├── resources
│   ├── cure_sync_ERD.pdf
│   └── cure_sync_requiremnet.pdf
├── src
│   ├── app
│   │   └── module
│   │       └── User
│   │           ├── user.controller.ts
│   │           ├── user.routes.ts
│   │           ├── user.service.ts
│   │           ├── user.ts
│   │           └── user.validation.ts
│   ├── app.ts
│   └── server.ts
├── structure.md
└── tsconfig.json

12 directories, 49 files
```

## 📁 Target Module Tree (app)

```bash
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app
└── module
    └── User
        ├── user.controller.ts
        ├── user.routes.ts
        ├── user.service.ts
        ├── user.ts
        └── user.validation.ts

3 directories, 5 files
```

## 📄 Module Files & Contents

### `module/User/user.controller.ts`
```ts
//

const create_admin = async (req, res) => {
  res.send({
    message: "Hello World",
  });
};

export const UserController = {
  create_admin,
};
```

### `module/User/user.ts`
```ts
//
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});
export const UserRoutes = router;
```
