//
import express from "express";
import { DoctorController } from "./doctor.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import { DoctorValidation } from "./doctor.validation";

const router = express.Router();

router.get("/", DoctorController.getAllDoctor);

router.get("/:id", DoctorController.getDoctorById);

//w: (start)╭──────────── updateDoctor  ────────────╮
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  validateRequest(DoctorValidation.doctorUpdateSchema),
  DoctorController.updateDoctor,
);
//w: (end) ╰──────────── updateDoctor  ────────────╯

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  DoctorController.softDeleteDoctor,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DoctorController.deleteDoctor,
);

export const DoctorRoutes = router;
