//

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (search: string) => {
  const result = await prisma.admin.findMany({
    where: {
      name: {
        contains: search,
      },
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
