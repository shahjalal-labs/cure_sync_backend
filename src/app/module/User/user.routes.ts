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

router.get("/me", auth(), UserController.getMyProfile);

//w: (start)╭──────────── createAdmin ────────────╮
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
//w: (end) ╰──────────── createAdmin ────────────╯

//w: (start)╭──────────── createDoctor ────────────╮
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
//w: (end) ╰──────────── createDoctor ────────────╯

//w: (start)╭──────────── createPatient ────────────╮
router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createPatient(req, res, next);
  },
);
//w: (end) ╰──────────── createPatient ────────────╯

//w: (start)╭──────────── changeProfileStatus ────────────╮
router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userValidation.changeProfileStatusValidationSchema),
  UserController.changeProfileStatus,
);
//w: (end) ╰──────────── changeProfileStatus ────────────╯

//w: (start)╭──────────── updateMyProfile  ────────────╮
router.patch(
  "/me/update",
  auth(),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.updateMyProfileValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    return UserController.updateMyProfile(req, res, next);
  },
);
//w: (end) ╰──────────── updateMyProfile  ────────────╯

//w: (start)╭──────────── bulkCreateAdmins ────────────╮
router.post(
  "/bulk-create-admins",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.bulkCreateAdminValidationSchema.parse(req.body);
    return UserController.bulkCreateAdmins(req, res, next);
  },
);
//w: (end) ╰──────────── bulkCreateAdmins ────────────╯

export const UserRoutes: Router = router;
