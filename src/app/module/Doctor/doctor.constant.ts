//
import { Doctor } from "@prisma/client";

//
export const doctorSearchableFields: Array<keyof Doctor> = [
  "name",
  "email",
  "contactNumber",
  "address",
  "qualification",
  "designation",
];

export const doctorFilterableFields: string[] = [
  "searchTerm",
  "email",
  "contactNumber",
  "gender",
  "appointmentFee",
  "specialities",
];
