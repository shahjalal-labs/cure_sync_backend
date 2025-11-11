//
import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AppointmentController } from "./appointment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AppointmentValidation } from "./appointment.validation";

const router = express.Router();

//w: (start)╭──────────── createAppointment ────────────╮
router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(AppointmentValidation.createAppointmenSchema),
  AppointmentController.createAppointment,
);
//w: (end)  ╰──────────── createAppointment ────────────╯

//
//w: (start)╭────────────  getMyAppointment ────────────╮
router.get(
  "/",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment,
);
//w: (end)  ╰────────────  getMyAppointment ────────────╯

//w: (start)╭──────────── router ────────────╮
router.patch(
  "/status/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR),
  AppointmentController.changeAppointmentStatus,
);
//w: (end)  ╰──────────── router ────────────╯

export const AppointmentRoutes = router;
