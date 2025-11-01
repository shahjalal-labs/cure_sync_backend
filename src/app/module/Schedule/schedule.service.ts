//
import { Schedule } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { addDays, addMinutes, isBefore, format, addHours } from "date-fns";
import { TSchedule } from "./schedule.validation";

//w: (start)╭──────────── createSchedule  ────────────╮

const createSchedule = async (payload: TSchedule): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;

  const interverlTime = 30;

  const schedules = [];

  const currentDate = new Date(startDate); // start date
  const lastDate = new Date(endDate); // end date

  while (currentDate <= lastDate) {
    // 09:30  ---> ['09', '30']
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]),
        ),
        Number(startTime.split(":")[1]),
      ),
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]),
        ),
        Number(endTime.split(":")[1]),
      ),
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, interverlTime),
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + interverlTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

//w: (end) ╰──────────── createSchedule ────────────╯

//w: (start)╭──────────── getAllSchedules ────────────╮
const getAllSchedules = async () => {
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
