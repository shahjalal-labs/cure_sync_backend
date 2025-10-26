//

import { prisma } from "../../../shared/prisma";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = async () => {
  console.log(`okay`);

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
