//

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (search: string) => {
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (search) {
    andConditions.push(
      /* {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }, */

      /* {
        email: {
          contains: search,
          mode: "insensitive",
        },
      }, */
      {
        OR: ["name", "email"].map((field) => ({
          [field]: { contains: search, mode: "insensitive" },
        })),
      },
    );
  }

  console.dir(andConditions, {
    depth: "infinity",
  });

  const whereConditions: Prisma.AdminWhereInput = {
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
