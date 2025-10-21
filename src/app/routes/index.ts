//
import express from "express";
import { UserRoutes } from "../module/User/user.routes";
import { AdminRoutes } from "../module/Admin/admin.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
