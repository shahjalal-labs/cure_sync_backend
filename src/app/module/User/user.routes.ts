//
import express, { Router } from "express";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
const router: Router = express.Router();

const auth =
  (...roles: string[]) =>
  (req, res, next) => {
    console.log(`roles`, roles);
  };

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.createAdmin,
);
router.get("/", UserController.getAllUsers);

export const UserRoutes: Router = router;
