//
import { prisma } from "../../../shared/prisma";
import { addDays, addMinutes, isBefore, format } from "date-fns";

//w: (start)╭──────────── createSchedule  ────────────╮

async function createSchedule({ startDate, endDate, startTime, endTime }) {
  const slots = [];
  const interval = 30; // minutes

  for (
    let day = new Date(startDate);
    day <= new Date(endDate);
    day = addDays(day, 1)
  ) {
    const dateStr = format(day, "yyyy-MM-dd");

    let start = new Date(`${dateStr}T${startTime}:00`);
    const end = new Date(`${dateStr}T${endTime}:00`);

    while (isBefore(start, end)) {
      slots.push({
        startDateTime: start,
        endDateTime: addMinutes(start, interval),
      });
      start = addMinutes(start, interval);
    }
  }

  await prisma.schedule.createMany({
    data: slots,
    skipDuplicates: true,
  });

  console.log("✅ Created slots:", slots.length);
  return slots;
}

//w: (end) ╰──────────── createSchedule ────────────╯

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
  createSchedule,
  getScheduleByIdFromDB,
  deleteScheduleFromDB,
};
