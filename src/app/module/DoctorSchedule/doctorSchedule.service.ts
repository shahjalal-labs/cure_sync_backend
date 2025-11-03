import { prisma } from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";

//
const createDoctorSchedule = async (
  user: IAuthUser,
  payload: {
    scheduleIds: string[];
  },
) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
};

export const DoctorScheduleService = {
  createDoctorSchedule,
};
