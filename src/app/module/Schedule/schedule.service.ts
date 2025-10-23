//

import { prisma } from "../../../shared/prisma";

//w: (start)╭──────────── createScheduleIntoDB  ────────────╮
const createScheduleIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const currentDate = new Date(startDate);
};
//w: (end) ╰──────────── createScheduleIntoDB  ────────────╯

//w: (start)╭────────────  ────────────╮

const getScheduleByIdFromDB = async (id: string) => {
  const result = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });
  return result;
};
//w: (end) ╰────────────  ────────────╯
//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const ScheduleService = {
  createScheduleIntoDB,
};
