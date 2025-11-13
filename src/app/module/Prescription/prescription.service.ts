//
import { Prescription } from "@prisma/client";
import { IAuthUser } from "../../interfaces/common";
import { prisma } from "../../../shared/prisma";
import { ApiError } from "../../errors/ApiError";
import httpStatus from "http-status";

const createPrescripton = async (
  user: IAuthUser,
  payload: Partial<Prescription>,
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
    },
  });
};

export const PrescriptionService = {
  createPrescripton,
};
