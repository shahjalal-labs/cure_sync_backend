//
import express, { Router } from "express";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
const router: Router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.createAdmin,
);
router.get("/", UserController.getAllUsers);

export const UserRoutes: Router = router;
