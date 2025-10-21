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
export default router;
