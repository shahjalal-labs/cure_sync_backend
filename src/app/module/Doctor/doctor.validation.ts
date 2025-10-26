//
import z from "zod";

const doctorUpdateSchema = z.object({
  body: z
    .object({
      name: z.string().min(3).max(100),
      contactNumber: z.string().min(3).max(100),
      address: z.string().min(3).max(100),
      registrationNumber: z.string().min(3).max(100),
      experience: z.number().min(0).max(60),
      gender: z.enum(["MALE", "FEMALE"]),
      appointmentFee: z.number().positive(),
      qualification: z.string().min(3).max(100),
      currentWorkingPlace: z.string().min(3).max(100),
      designation: z.string().min(3).max(100),
    })
    .partial()
    .strict(),
});

export const DoctorValidation = {
  doctorUpdateSchema,
};
