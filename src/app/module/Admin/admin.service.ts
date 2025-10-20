//

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (search: string) => {
  const andConditions = [
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
  ];

  if (search) {
    andConditions.push();
  }

  console.dir(andConditions, {
    depth: "infinity",
  });

  const result = await prisma.admin.findMany({
    where: {
      OR: andConditions,
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
