//
import { Prisma, Schedule } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { addMinutes, format } from "date-fns";
import { TSchedule } from "./schedule.validation";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IAuthUser } from "../../interfaces/common";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { IFilterRequest } from "./schedule.interface";

//w: (start)╭──────────── createSchedule  ────────────╮
const createSchedule = async (payload: TSchedule): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const baseDate = format(currentDate, "yyyy-MM-dd");

    let start = new Date(`${baseDate}T${startTime}:00`);
    const end = new Date(`${baseDate}T${endTime}:00`);

    while (start < end) {
      const scheduleData = {
        startDateTime: start,
        endDateTime: addMinutes(start, intervalTime),
      };

      // will naturally throw Prisma P2002 if duplicate
      const result = await prisma.schedule.create({
        data: scheduleData,
      });

      schedules.push(result);
      start = addMinutes(start, intervalTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

//w: (end) ╰──────────── createSchedule ────────────╯

//w: (start)╭──────────── getAllSchedules ────────────╮
const getAllSchedules = async (
  filters: IFilterRequest,
  options: IPaginationOptions,
  user: IAuthUser,
) => {
  const { limit, page, skip } = paginationHelper.calcalutePagination(options);

  const andConditions: Prisma.ScheduleWhereInput[] = [];

  // starte and enddate for filtering  use iso datetime format
  const { startDate, endDate, ...filterData } = filters; //p:...filterData has no usage here(perhaps).

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        {
          startDateTime: {
            gte: startDate,
          },
        },
        {
          endDateTime: {
            lte: endDate,
          },
        },
      ],
    });
  }
  //p:...filterData has no usage here(perhaps).
  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const doctorSchedules = await prisma.doctorSchedules.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
  });

  const doctorScheduleIds = doctorSchedules.map((d) => d.scheduleId);

  const whereConditions: Prisma.ScheduleWhereInput = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};
  const result = await prisma.schedule.findMany({
    where: {
      ...whereConditions,

      //p: remove the schedules that are already booked for the doctor who is seeing all schedules. as a doctor should not see schedules which are already selected
      id: {
        notIn: doctorScheduleIds,
      },
    },

    skip,
    take: limit,
  });

  const total = await prisma.schedule.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
//w: (end) ╰──────────── getAllSchedules  ────────────╯

//w: (start)╭──────────── getScheduleByIdFromDB  ────────────╮
const getScheduleByIdFromDB = async (id: string) => {
  const result = await prisma.schedule.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
//w: (end) ╰──────────── getScheduleByIdFromDB  ────────────╯
//
//w: (start)╭──────────── deleteSchedule ────────────╮
const deleteScheduleFromDB = async (id: string) => {
  await prisma.schedule.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.schedule.delete({
    where: {
      id,
    },
  });
  return result;
};
//w: (end) ╰──────────── deleteSchedule ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const ScheduleService = {
  createSchedule,
  getScheduleByIdFromDB,
  deleteScheduleFromDB,
  getAllSchedules,
};
