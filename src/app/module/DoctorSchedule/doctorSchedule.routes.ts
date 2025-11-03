//
import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./doctorSchedule.controller";

const router = express.Router();

//w: (start)╭──────────── createDoctorSchedule   ────────────╮
router.post(
  "/",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.createDoctorSchedule,
);
//w: (end)  ╰──────────── createDoctorSchedule   ────────────╯

export const DoctorScheduleRoutes = router;
