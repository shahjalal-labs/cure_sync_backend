//
import { Gender, UserRole, UserStatus } from "@prisma/client";
import z from "zod";

//w: (start)╭──────────── createAdminValidationSchema  ────────────╮
const createAdminValidationSchema = z
  .object({
    password: z.string(),
    admin: z.object({
      name: z.string({}),
      email: z.string(),
      contactNumber: z.string(),
    }),
  })
  .strict();
//w: (end) ╰──────────── createAdminValidationSchema  ────────────╯

//w: (start)╭──────────── createDoctorValidationSchema  ────────────╮
const createDoctorValidationSchema = z
  .object({
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
  })
  .strict();
//w: (end) ╰────────────  createDoctorValidationSchema ────────────╯

//w: (start)╭──────────── createPatientValidationSchema  ────────────╮
const createPatientValidationSchema = z
  .object({
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
  })
  .strict();
//w: (end) ╰──────────── createPatientValidationSchema  ────────────╯

//w: (start)╭──────────── changeProfileStatusValidationSchema  ────────────╮
const changeProfileStatusValidationSchema = z.object({
  body: z
    .object({
      status: z.enum([
        UserStatus.ACTIVE,
        UserStatus.BLOCKED,
        UserStatus.DELETED,
      ]),
    })
    .strict(),
});
//w: (end) ╰──────────── changeProfileStatusValidationSchema  ────────────╯

//w: (start)╭──────────── updateMyProfile  ────────────╮
const updateMyProfileValidationSchema = z
  .object({
    name: z.string().min(2).max(50),
    contactNumber: z.string().min(4).max(15),
  })
  .partial()
  .strict();
//w: (end) ╰──────────── updateMyProfile  ────────────╯
export type TUpdateMyProfile = z.infer<typeof updateMyProfileValidationSchema>;

export const userValidation = {
  createAdminValidationSchema,
  createDoctorValidationSchema,
  createPatientValidationSchema,
  changeProfileStatusValidationSchema,
  updateMyProfileValidationSchema,
};
