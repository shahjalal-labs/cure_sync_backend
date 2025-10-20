//

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (search: string) => {
  const result = await prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
