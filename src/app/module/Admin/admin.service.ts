//

import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper, TOptions } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";

const getAllFromDB = async (params: any, options: TOptions) => {
  const andConditions: Prisma.AdminWhereInput[] = [];

  const { searchTerm, ...filterData } = params;
  // console.log(filterData, "[1;31mfilterData in admin.service.ts at line 12[0m");

  if (params.searchTerm) {
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
        OR: adminSearchableFields.map((field) => ({
          [field]: { contains: searchTerm, mode: "insensitive" },
        })),
      },
    );
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
          mode: "insensitive",
        },
      })),
    });
  }

  // console.dir(andConditions, {
  //   depth: "infinity",
  // });

  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  const {
    skip,
    limit: take,
    page,
  } = paginationHelper.calcalutePagination(options);
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
