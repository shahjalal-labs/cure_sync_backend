//

import { Patient } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = async (
  filters,
  options: IPaginationOptions,
): Promise<Patient[] | null> => {
  const { page, limit, skip } = paginationHelper.calcalutePagination(options);

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
