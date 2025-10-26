import { Doctor, UserStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { IDoctorUpdate } from "./doctor.interface";

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

//w: (start)╭──────────── getDoctorById  ────────────╮
const getDoctorById = async (id: string): Promise<Doctor | null> => {
  return await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
};
//w: (end) ╰──────────── getDoctorById  ────────────╯

//
//w: (start)╭──────────── updateDoctor  ────────────╮
const updateDoctor = async (
  id: string,
  payload: IDoctorUpdate,
): Promise<Doctor | null> => {
  const { specialities, ...doctorData } = payload;
console.log(specialities, "[1;31mspecialities in doctor.service.ts at line 34[0m");
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: {
        id,
      },
      data: doctorData,
    });
    //
    if (specialities && specialities.length) {
      //t: delete specialities
      const deleteSpecialites = specialities.filter((spc) => spc.isDeleted);

      deleteSpecialites.forEach((spc) => {
        tx.doctorSpecialities.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialitiesId: spc.specialitiesId,
          },
        });
      });

      //t: create  specialities
      const createSpecialites = specialities.filter((spc) => !spc.isDeleted);
      createSpecialites.forEach((spc) => {
        tx.doctorSpecialities.create({
          data: {
            doctorId: doctorInfo.id,
            specialitiesId: spc.specialitiesId,
          },
        });
      });
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
  });
  return result;
};
//w: (end) ╰──────────── updateDoctor  ────────────╯

//w: (start)╭──────────── softDeleteDoctor  ────────────╮
const softDeleteDoctor = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.doctor.findUniqueOrThrow({
      where: {
        id,
        isDeleted: false,
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

//w: (start)╭──────────── deleteDoctor ────────────╮
const deleteDoctor = async (id: string): Promise<Doctor> => {
  return await prisma.$transaction(async (tx) => {
    await tx.doctor.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const deletedDoctor = await tx.doctor.delete({
      where: {
        id,
      },
    });
    await tx.user.delete({
      where: {
        email: deletedDoctor.email,
      },
    });
    return deletedDoctor;
  });
};
//w: (end) ╰──────────── deleteDoctor ────────────╯

export const DoctorService = {
  getAllDoctor,
  updateDoctor,
  softDeleteDoctor,
  deleteDoctor,
  getDoctorById,
};
