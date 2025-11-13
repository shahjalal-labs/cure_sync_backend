//
import { IAuthUser } from "../../interfaces/common";
import { prisma } from "../../../shared/prisma";
import { ApiError } from "../../errors/ApiError";
import httpStatus from "http-status";
import { TCreatePrescriptionSchema } from "./prescription.validation";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { Prisma } from "@prisma/client";

const { prescription } = prisma;

//w: (start)╭──────────── createPrescripton ────────────╮
const createPrescripton = async (
  user: IAuthUser,
  payload: TCreatePrescriptionSchema,
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
    include: {
      doctor: true,
    },
  });

  if (!(user.email === appointmentData.doctor.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This is not your appointment!");
  }

  const result = await prescription.create({
    data: {
      appointmentId: appointmentData.id,
      doctorId: appointmentData.doctorId,
      patientId: appointmentData.patientId,
      followUpDate: payload.followUpDate,
      instructions: payload.instructions,
    },
    include: {
      patient: {
        omit: {
          updatedAt: true,
          createdAt: true,
        },
      },
    },
  });
  return result;
};
//w: (end)  ╰──────────── createPrescripton ────────────╯

const getAllPrescriptionsForAdoctor = async (
  filters: any,
  options: IPaginationOptions,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calcalutePagination(options);

  const { patientEmail, doctorEmail } = filters;

  const andConditions: Prisma.PrescriptionWhereInput[] = [];

  if (patientEmail) {
  }
  if (doctorEmail) {
  }
};

export const PrescriptionService = {
  createPrescripton,
  getAllPrescriptionsForAdoctor,
};
