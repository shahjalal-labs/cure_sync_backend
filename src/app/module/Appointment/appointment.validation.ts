//

import z from "zod";

//w: (start)╭──────────── createAppointmen ────────────╮
const createAppointmenSchema = {
  body: z.object({
    doctorId: z.string().uuid(),
    scheduleId: z.string().uuid(),
  }),
};
//w: (end)  ╰──────────── createAppointmen ────────────╯

export const AppointmentValidation = {
  createAppointmenSchema,
};
