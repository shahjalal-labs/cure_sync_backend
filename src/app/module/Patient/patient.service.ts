//

import { Patient, Prisma, UserStatus } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IPatientFilterRequest } from "./patient.interface";
import { patientSearchableFields } from "./patient.constant";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelper.calcalutePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    console.log(
      searchTerm,
      "[1;31msearchTerm in patient.service.ts at line 22[0m",
    );
    andConditions.push({
      OR: patientSearchableFields.map((f) => ({
        [f]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map((f) => ({
        [f]: {
          equals: (filterData as any)[f],
          mode: "insensitive",
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
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

  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
//w: (end) ╰──────────── getAllPatient  ────────────╯

//w: (start)╭──────────── getPatientById ────────────╮
const getPatientById = async (id: string): Promise<Patient | null> => {
  console.log(id, "[1;31mid in patient.service.ts at line 88[0m");
  const result = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};
//w: (end) ╰──────────── getPatientById ────────────╯

//w: (start)╭────────────  ────────────╮
const updatePatient = async (id: string) => {};
//w: (end) ╰────────────  ────────────╯

//w: (start)╭──────────── softDeletePatient  ────────────╮
const softDeletePatient = async (id: string) => {
  await prisma.$transaction(async (tx) => {
    const deletedPatient = await tx.patient.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    tx.user.update({
      where: {
        email: deletedPatient.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
  });
};
//w: (end) ╰──────────── softDeletePatient  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

export const PatientService = {
  getAllPatient,
  getPatientById,
  softDeletePatient,
};
