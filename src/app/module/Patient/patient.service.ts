//

import { Patient, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IPatientFilterRequest } from "./patient.interface";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions,
): Promise<Patient[] | null> => {
  // const { page, limit, skip } = paginationHelper.calcalutePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
        OR: 
    })
  }
  const result = await prisma.patient.findMany({
    where: {
      isDeleted: false,
    },
  });
  return result;
};
//w: (end) ╰──────────── getAllPatient  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

export const PatientService = {
  getAllPatient,
};
