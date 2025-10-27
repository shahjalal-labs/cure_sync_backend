import z from "zod";

const updatePatientSchema = z.object({
  body: z
    .object({
      name: z.string().min(3),
      contactNumber: z.string().min(4),
      address: z.string(),
      patientHealthData: z.object().optional(),
    })
    .partial()
    .strict(),
});

export const PatientValidation = {
  updatePatientSchema,
};
