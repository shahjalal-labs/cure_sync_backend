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

export const AppointmentRoutes = router;
