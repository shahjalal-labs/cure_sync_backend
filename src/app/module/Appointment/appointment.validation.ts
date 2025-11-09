//

import z from "zod";

//w: (start)╭──────────── createAppointmen ────────────╮
const createAppointmenSchema = z.object({
  body: z
    .object({
      doctorId: z.uuidv4(),
      scheduleId: z.uuidv4(),
    })
    .strict(),
});

export type TCreateAppointment = z.infer<typeof createAppointmenSchema>["body"];

//w: (end)  ╰──────────── createAppointmen ────────────╯

export const AppointmentValidation = {
  createAppointmenSchema,
};
