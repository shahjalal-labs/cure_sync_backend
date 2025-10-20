//

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (search: string) => {
  const andConditions = [];

  if (search) {
    andConditions.push(
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
    );
  }

  console.dir(andConditions, {
    depth: "infinity",
  });

  const whereConditions = {
    AND: andConditions,
  };

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
