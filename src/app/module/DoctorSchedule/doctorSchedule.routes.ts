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

//w: (start)╭──────────── getMySchedules     ────────────╮
router.get(
  "/my-schedules",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedules,
);
//w: (end)  ╰──────────── getMySchedules     ────────────╯

//w: (start)╭──────────── deleteDoctorSchedule ────────────╮
router.delete(
  "/:id",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.deleteDoctorSchedule,
);
//w: (end)  ╰──────────── deleteDoctorSchedule ────────────╯

export const DoctorScheduleRoutes = router;
