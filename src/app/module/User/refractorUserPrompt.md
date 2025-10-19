```bash
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app/module/User
├── userApi.hurl
├── user.controller.ts
├── user.routes.ts
├── user.service.ts
└── user.validation.ts

1 directory, 5 files
```

## 📄 Module Files & Contents

### `user.controller.ts`

```ts
//

import { RequestHandler } from "express";
import { UserService } from "./user.service";

const createAdmin: RequestHandler = async (req, res) => {
  const result = await UserService.createAdminIntoDB(req.body);
  res.send({
    message: "Hello World",
    data: result,
  });
};

export const UserController = {
  createAdmin,
};
```

### `user.routes.ts`

```ts
//
import express, { Router } from "express";
import { UserController } from "./user.controller";
const router: Router = express.Router();

router.post("/", UserController.createAdmin);

export const UserRoutes: Router = router;
```

### `userApi.hurl`

```hurl
POST {{port6009 }}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "admin@cure.sync",
    "name": "admin",
    "contactNumber": "1234567890"
  }
}
```

### `user.service.ts`

```ts
//
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdminIntoDB = async (data: any) => {
  console.log(`password`, data.password);
  const hashedPassword = await bcrypt.hash(data?.password, 12);
  console.log(
    hashedPassword,
    "[1;31mhashedPassword in user.service.ts at line 7[0m",
  );

  const userData = {
    email: data.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (txClient) => {
    await txClient.user.create({
      data: userData,
    });

    const createdAdminData = await txClient.admin.create({
      data: data.admin,
    });
    return createdAdminData;
  });
  return result;
};

export const UserService = {
  createAdminIntoDB,
};
```
