//
import { IAuthUser } from "../../interfaces/common";
import { prisma } from "../../../shared/prisma";
import { ApiError } from "../../errors/ApiError";
import httpStatus from "http-status";
import { TCreatePrescriptionSchema } from "./prescription.validation";

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

  const result = await prisma.prescription.create({
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

export const PrescriptionService = {
  createPrescripton,
};
