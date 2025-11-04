//
import { Schedule } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { addMinutes, format } from "date-fns";
import { TSchedule } from "./schedule.validation";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IAuthUser } from "../../interfaces/common";
import { paginationHelper, paginationHelper } from "../../../helpers/paginatonHelper";

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
  filters,
  options: IPaginationOptions,
  user: IAuthUser,
) => {

   const =paginationHelper. ;
  const result = await prisma.schedule.findMany();
  return result;
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
