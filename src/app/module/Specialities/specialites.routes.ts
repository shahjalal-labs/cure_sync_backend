//
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { SpecialitiesValidation } from "./specialites.validation";
import { SpecialitiesController } from "./specialites.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialitiesValidation.createSpecialitiesValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return SpecialitiesController.createSpecialities(req, res, next);
  },
);
router.get("/", SpecialitiesController.getAllSpecialities);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SpecialitiesController.deleteSpecialities,
);

export const SpecialitiesRoutes = router;
