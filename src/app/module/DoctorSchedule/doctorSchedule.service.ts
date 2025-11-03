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
};
//w: (end)  ╰──────────── createDoctorSchedule   ────────────╯

//w: (start)╭────────────   ────────────╮

//w: (end)  ╰────────────   ────────────╯

export const DoctorScheduleService = {
  createDoctorSchedule,
};
