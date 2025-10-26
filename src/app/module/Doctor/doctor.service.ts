import { prisma } from "../../../shared/prisma";

//w: (start)╭──────────── getAllDoctor  ────────────╮
const getAllDoctor = async () => {
  const result = await prisma.doctor.findMany();
  return result;
};
//w: (end) ╰──────────── getAllDoctor  ────────────╯
//

export const DoctorService = {
  getAllDoctor,
};
