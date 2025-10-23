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
  password: z.string({ message: "Password is required" }),
  doctor: z.object({
    name: z.string({ message: "Doctor name is required" }),
    email: z.string({ message: "Email is required" }),
    contactNumber: z.string({ message: "Contact number is required" }),
    address: z.string().optional(),
    registrationNumber: z.string({
      message: "Registration number is required",
    }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE], {
      message: "Gender is required",
    }),
    appointmentFee: z
      .number({ message: "Appointment fee is required" })
      .positive("Appointment fee must be positive"),
    qualification: z.string({ message: "Qualification is required" }),
    currentWorkingPlace: z.string({
      message: "Current working place is required",
    }),
    designation: z.string({ message: "Designation is required" }),
  }),
});

const createPatientValidationSchema = z.object({
  password: z.string({
    message: "Password is required",
  }),
  patient: z.object({
    name: z.string({ message: "Patient name is required" }),
    email: z.string({ message: "Email is required" }),
    contactNumber: z.string({
      message: "Contact number is required",
    }),
    address: z.string().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
  }),
});

export const userValidation = {
  createAdminValidationSchema,
  createDoctorValidationSchema,
  createPatientValidationSchema,
};
