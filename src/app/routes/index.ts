//
import express from "express";
import { UserRoutes } from "../module/User/user.routes";
import { AdminRoutes } from "../module/Admin/admin.routes";
import { AuthRoutes } from "../module/Auth/auth.routes";
const router = express.Router();

type IModuleRoutes = {
  path: string;
  route: express.Router;
};

const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
