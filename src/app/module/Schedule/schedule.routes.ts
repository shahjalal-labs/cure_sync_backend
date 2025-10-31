//
import express from "express";
import { ScheduleController } from "./schedule.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleController.getSchedulById,
);

//w: (start)╭──────────── deleteSchedule ────────────╮
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.deleteSchedule,
);
//w: (end) ╰──────────── deleteSchedule ────────────╯

//w: (start)╭──────────── createSchedule  ────────────╮
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ScheduleController.createSchedule,
);
//w: (end) ╰──────────── createSchedule ────────────╯

export const ScheduleRoutes = router;
