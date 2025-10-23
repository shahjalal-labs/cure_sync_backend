//

import { prisma } from "../../../shared/prisma";

//w: (start)╭──────────── createScheduleIntoDB  ────────────╮
const createScheduleIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const currentDate = new Date(startDate);
};
//w: (end) ╰──────────── createScheduleIntoDB  ────────────╯

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
//w: (start)╭──────────── deleteScheduleFromDB  ────────────╮
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
//w: (end) ╰──────────── deleteScheduleFromDB  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const ScheduleService = {
  createScheduleIntoDB,
  getScheduleByIdFromDB,
  deleteScheduleFromDB,
};
