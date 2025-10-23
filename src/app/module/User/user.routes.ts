//
import express, { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
const router: Router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = user;
  },
  UserController.createAdmin,
);

router.get("/", UserController.getAllUsers);

export const UserRoutes: Router = router;
