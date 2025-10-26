import { Doctor, UserStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

//w: (start)╭──────────── getAllDoctor  ────────────╮
const getAllDoctor = async () => {
  const result = await prisma.doctor.findMany({
    where: {
      isDeleted: false,
    },
  });
  return result;
};
//w: (end) ╰──────────── getAllDoctor  ────────────╯
//
//w: (start)╭──────────── updateDoctor  ────────────╮
const updateDoctor = async (
  id: string,
  payload: Partial<Doctor>,
): Promise<Doctor | null> => {
  const { specialities, ...doctorData } = payload;
  const existingDoctor = await prisma.doctor.findUniqueOrThrow({
    where: { id },
  });

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {},
    });
  });
  return null;
};
//w: (end) ╰──────────── updateDoctor  ────────────╯

//w: (start)╭──────────── softDeleteDoctor  ────────────╮
const softDeleteDoctor = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.doctor.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const deletedDoctor = await tx.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await tx.user.update({
      where: {
        email: deletedDoctor.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deletedDoctor;
  });
  return result;
};
//w: (end) ╰──────────── softDeleteDoctor  ────────────╯

export const DoctorService = {
  getAllDoctor,
  updateDoctor,
  softDeleteDoctor,
};
