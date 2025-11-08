//
import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { TCreateDoctorSchedule } from "./doctorSchedule.validation";
import { ApiError } from "../../errors/ApiError";
import httpStatus from "http-status";
import { IDoctorScheduleFilterRequest } from "./doctorSchedule.interface";

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

  andConditions.push({
    AND: [
      {
        doctor: {
          email: user.email,
        },
      },
    ],
  });

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

  andConditions.push({
    AND: Object.keys(filterData).map((key) => {
      return {
        [key]: {
          equals: (filterData as any)[key],
        },
      };
    }),
  });

  const whereConditions: Prisma.DoctorSchedulesWhereInput = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};

  const result = await prisma.doctorSchedules.findMany({
    where: whereConditions,
    include: {
      schedule: {
        select: {
          startDateTime: true,
          endDateTime: true,
        },
      },
      doctor: {
        select: {
          name: true,
          _count: true,
          email: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });

  const total = await prisma.doctorSchedules.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//w: (end)  ╰──────────── getMySchedules  ────────────╯

//w: (start)╭──────────── deleteDoctorSchedule ────────────╮
const deleteDoctorSchedule = async (user: IAuthUser, id: string) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isBooked = await prisma.doctorSchedules.findFirst({
    where: {
      isBooked: true,
      doctorId: doctorInfo.id,
      scheduleId: id,
    },
  });

  if (isBooked)
    throw new ApiError(httpStatus.BAD_REQUEST, "Schedule is already booked!");

  const result = await prisma.doctorSchedules.delete({
    where: {
      doctorId_scheduleId: {
        doctorId: doctorInfo.id,
        scheduleId: id,
      },
    },
  });
  return result;
};

//w: (end)  ╰──────────── deleteDoctorSchedule ────────────╯

//w: (start)╭──────────── getAllSchedules ────────────╮
const getAllSchedules = async (
  filters: IDoctorScheduleFilterRequest,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelper.calcalutePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.DoctorSchedulesWhereInput = [];

  if (searchTerm) {
    andConditions.push({
      doctor: {},
    });
  }
};
//w: (end)  ╰──────────── getAllSchedules ────────────╯

export const DoctorScheduleService = {
  createDoctorSchedule,
  getMySchedules,
  deleteDoctorSchedule,
  getAllSchedules,
};
