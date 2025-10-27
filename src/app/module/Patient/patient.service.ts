//

import { Patient, Prisma } from "@prisma/client";
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
          equlas: (filterData as any)[f],
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

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

export const PatientService = {
  getAllPatient,
};
