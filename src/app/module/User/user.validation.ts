//
import { Gender } from "@prisma/client";
import z from "zod";

const createAdminValidationSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string({}),
    email: z.string(),
    contactNumber: z.string(),
  }),
});

const createDoctorValidationSchema = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  doctor: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    address: z.string(),
    registrationNumber: z.string(),
    experience: z.number(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number().positive(),
    qualification: z.string(),
    currentWorkingPlace: z.string(),
    designation: z.string(),
  }),
});

const createPatientValidationSchema = z.object({
  password: z.string(),
});

export const userValidation = {
  createAdminValidationSchema,
  createDoctorValidationSchema,
};
