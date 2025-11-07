import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { TCreateDoctorSchedule } from "./doctorSchedule.validation";
import { object } from "zod";

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
const getMySchedules = async (
  filters: any,
  options: IPaginationOptions,
  user: IAuthUser,
) => {
  const { limit, page, skip } = paginationHelper.calcalutePagination(options);

  const { startDate, endDate, ...filterData } = filters;

  const andConditions: Prisma.DoctorSchedulesWhereInput[] = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          schedule: {
            startDateTime: {
              gte: startDate,
            },
          },
        },
        {
          schedule: {
            endDateTime: {
              lte: endDate,
            },
          },
        },
      ],
    });
  }

  if (Object.keys(filterData).length) {
    if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "true"
    ) {
      filterData.isBooked = true;
    } else if (
      typeof filterData.isBooked === "string" &&
      filterData.isBooked === "false"
    ) {
      filterData.isBooked = false;
    }
  }

  const result = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
  });
  return result;
};
//w: (end)  ╰──────────── getMySchedules  ────────────╯

export const DoctorScheduleService = {
  createDoctorSchedule,
  getMySchedules,
};
