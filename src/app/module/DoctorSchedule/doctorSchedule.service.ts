import { prisma } from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { TCreateDoctorSchedule } from "./doctorSchedule.validation";

//

//w: (start)╭──────────── createDoctorSchedule   ────────────╮
const createDoctorSchedule = async (
  user: IAuthUser,
  payload: TCreateDoctorSchedule,
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorScheduleData = payload.scheduleIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
};
//w: (end)  ╰──────────── createDoctorSchedule   ────────────╯

//w: (start)╭──────────── getMySchedules  ────────────╮
const getMySchedules = async (user: IAuthUser) => {
  const result = await prisma.schedule.findMany({
    where: {},
  });
  return result;
};
//w: (end)  ╰──────────── getMySchedules  ────────────╯

export const DoctorScheduleService = {
  createDoctorSchedule,
  getMySchedules,
};
