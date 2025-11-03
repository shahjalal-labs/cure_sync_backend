//
import z from "zod";

//w: (start)╭────────────   ────────────╮

//w: (end)  ╰────────────   ────────────╯

//w: (start)╭──────────── createDoctorSchedule ────────────╮
const createDoctorScheduleSchema = z.object({
  body: z.object({
    scheduleIds: z.array(z.string()),
  }),
});

export type TCreateDoctorSchedule = z.infer<
  typeof createDoctorScheduleSchema
>["body"];

//w: (end)  ╰──────────── createDoctorSchedule ────────────╯

export const DoctorScheduleValidation = {
  createDoctorScheduleSchema,
};
