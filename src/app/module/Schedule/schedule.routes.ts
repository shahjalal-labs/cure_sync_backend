//
import express from "express";
import { ScheduleController } from "./schedule.controller";

const router = express.Router();
router.get("/:id", ScheduleController.getSchedulById);
export const ScheduleRoutes = router;
