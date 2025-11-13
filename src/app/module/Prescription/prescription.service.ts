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

//w: (start)╭──────────── getAllPrescriptionsForAdoctor ────────────╮
const getAllPrescriptions = async (
  filters: any,
  options: IPaginationOptions,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calcalutePagination(options);

  const { patientEmail, doctorEmail } = filters;

  const andConditions: Prisma.PrescriptionWhereInput[] = [];

  if (patientEmail) {
    andConditions.push({
      patient: {
        email: patientEmail,
      },
    });
  }
  if (doctorEmail) {
    andConditions.push({
      doctor: {
        email: doctorEmail,
      },
    });
  }

  const whereConditions: Prisma.PrescriptionWhereInput = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};

  const result = await prescription.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "asc",
          },
  });

  const total = await prescription.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: {
      data: result,
    },
  };
};
//w: (end)  ╰──────────── getAllPrescriptionsForAdoctor ────────────╯

export const PrescriptionService = {
  createPrescripton,
  getAllPrescriptions,
};
