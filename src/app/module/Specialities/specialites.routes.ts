//
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { SpecialitiesValidation } from "./specialites.validation";
import { SpecialitiesController } from "./specialites.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

//w: (start)╭──────────── createSpecialities ────────────╮
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialitiesValidation.createSpecialitiesValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return SpecialitiesController.createSpecialities(req, res, next);
  },
);
//w: (end) ╰──────────── createSpecialities ────────────╯

router.get("/", SpecialitiesController.getAllSpecialities);

//w: (start)╭──────────── deleteSpecialities ────────────╮
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SpecialitiesController.deleteSpecialities,
);
//w: (end) ╰──────────── deleteSpecialities ────────────╯

//w: (start)╭──────────── bulkCreateSpecialities ────────────╮
router.post(
  "/bulk-create",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body =
      SpecialitiesValidation.bulkCreateSpecialitiesValidationSchema.parse(
        req.body,
      );
    return SpecialitiesController.bulkCreateSpecialities(req, res, next);
  },
);
//w: (end) ╰──────────── bulkCreateSpecialities ────────────╯

export const SpecialitiesRoutes = router;
