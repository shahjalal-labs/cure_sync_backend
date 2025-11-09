//
import express from "express";
import { UserRoutes } from "../module/User/user.routes";
import { AdminRoutes } from "../module/Admin/admin.routes";
import { AuthRoutes } from "../module/Auth/auth.routes";
import { SpecialitiesRoutes } from "../module/Specialities/specialites.routes";
import { DoctorRoutes } from "../module/Doctor/doctor.routes";
import { PatientRoutes } from "../module/Patient/patienst.routes";
import { ScheduleRoutes } from "../module/Schedule/schedule.routes";
import { DoctorScheduleRoutes } from "../module/DoctorSchedule/doctorSchedule.routes";
import { AppointmentRoutes } from "../module/Appointment/appointment.routes";
const router = express.Router();

type IModuleRoutes = {
  path: string;
  route: express.Router;
};

const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialities",
    route: SpecialitiesRoutes,
  },
  {
    path: "/doctors",
    route: DoctorRoutes,
  },
  {
    path: "/patients",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
