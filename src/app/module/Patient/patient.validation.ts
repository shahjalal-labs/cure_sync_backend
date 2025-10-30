//
import z from "zod";

const updatePatientSchema = z.object({
  body: z
    .object({
      name: z.string().min(3).optional(),
      contactNumber: z.string().min(4).optional(),
      address: z.string().optional(),
      patientHealthData: z
        .object({
          gender: z.enum(["MALE", "FEMALE"]),
          dateOfBirth: z.string().min(6),
          bloodGroup: z.enum([
            "A_POSITIVE",
            "B_POSITIVE",
            "O_POSITIVE",
            "AB_POSITIVE",
            "A_NEGATIVE",
            "B_NEGATIVE",
            "O_NEGATIVE",
            "AB_NEGATIVE",
          ]),
          hasAllergies: z.boolean().default(false),
          hasDiabetes: z.boolean().default(false),
          height: z.string().min(2),
          weight: z.string().min(2),
        })
        .strict()
        .optional(),
      medicalReport: z
        .object({
          reportName: z.string().min(3, "Report Name is required."),
          reportLink: z.string(),
        })
        .strict()
        .optional(),
    })
    .strict(),
});

export type TUpdatePatientPayload = z.infer<typeof updatePatientSchema>["body"];

export const PatientValidation = {
  updatePatientSchema,
};
