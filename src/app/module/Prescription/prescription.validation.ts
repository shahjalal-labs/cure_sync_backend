//
import z from "zod";

//w: (start)╭──────────── createPrescription ────────────╮
const createPrescriptionSchema = z.object({
  body: z
    .object({
      appointmentId: z.uuid(),
      doctorId: z.uuid(),
      patientId: z.uuid(),
      instructions: z.string(),
      followUpDate: z.date().optional(),
    })
    .strict(),
});

export type TCreatePrescriptionSchema = z.infer<
  typeof createPrescriptionSchema
>["body"];

//w: (end)  ╰──────────── createPrescription ────────────╯

export const PrescriptionValidation = {
  createPrescriptionSchema,
};
