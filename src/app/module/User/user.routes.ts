//
import express, { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
const router: Router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.getAllUsers,
);

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createAdmin(req, res, next);
  },
);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`body data from controller`, JSON.parse(req.body.data));
    req.body = userValidation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createDoctor(req, res, next);
  },
);

router.post(
  "/create-patient",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createPatient(req, res, next);
  },
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userValidation.changeProfileStatusValidationSchema),
  UserController.changeProfileStatus,
);

export const UserRoutes: Router = router;
