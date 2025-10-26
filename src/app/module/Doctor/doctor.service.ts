import { Doctor, Prisma, UserStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { IDoctorFilterRequest, IDoctorUpdate } from "./doctor.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { doctorSearchableFields } from "./doctor.constant";

//w: (start)╭──────────── getAllDoctor  ────────────╮
const getAllDoctor = async (
  filters: IDoctorFilterRequest,
  options: IPaginationOptions,
) => {
  const { limit, page, skip } = paginationHelper.calcalutePagination(options);

  const { searchTerm, specialities, ...filterData } = filters;

  const andConditions: Prisma.DoctorWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (specialities) {
    andConditions.push({
      doctorSpecialities: {
        some: {
          specialities: {
            title: {
              contains: specialities,
              mode: "insensitive",
            },
          },
        },
      },
    });
  }

  if (Object.keys(filterData).length) {
    const filterConditons = Object.keys(filterData).map((field) => ({
      [field]: (filterData as any)[field],
    }));
    andConditions.push(...filterConditons);
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.DoctorWhereInput = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    include: {
      doctorSpecialities: {
        select: {
          specialities: true,
          // specialitiesId: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
  console.log(
    specialities,
    "[1;31mspecialities in doctor.service.ts at line 34[0m",
  );
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

      for (const spc of deleteSpecialites) {
        await tx.doctorSpecialities.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialitiesId: spc.specialitiesId,
          },
        });
      }

      //t: create  specialities
      const createSpecialites = specialities.filter((spc) => !spc.isDeleted);
      /* createSpecialites.forEach((spc) => {
        tx.specialities.findUniqueOrThrow({
          where: {
            id: spc.specialitiesId,
          },
        });
        tx.doctorSpecialities.create({
          data: {
            doctorId: doctorInfo.id,
            specialitiesId: spc.specialitiesId,
          },
        });
      }); */
      for (const spc of createSpecialites) {
        // Ensure the speciality exists
        await tx.specialities.findUniqueOrThrow({
          where: { id: spc.specialitiesId },
        });

        // Link the doctor to this speciality
        await tx.doctorSpecialities.create({
          data: {
            doctorId: doctorInfo.id,
            specialitiesId: spc.specialitiesId,
          },
        });
      }
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialities: {
        select: {
          specialities: true,
        },
      },
      user: {
        select: {
          email: true,
          status: true,
          needPasswordChange: true,
        },
      },
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
