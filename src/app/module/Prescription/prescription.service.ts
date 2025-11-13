import { Prescription } from "@prisma/client";
import { IAuthUser } from "../../interfaces/common";
import { prisma } from "../../../shared/prisma";

const createPrescripton = async (
  user: IAuthUser,
  payload: Partial<Prescription>,
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
  });
};
