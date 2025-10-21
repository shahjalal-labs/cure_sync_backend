//

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper, TOptions } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";
import { TAdminFilterRequest } from "./admin.interace";

//w: (start)╭──────────── get all admin from db  ────────────╮

const getAllFromDB = async (params: TAdminFilterRequest, options: TOptions) => {
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

  andConditions.push({
    isDeleted: false,
  });

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

  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit: take,
      total,
    },
    data: result,
  };
};

//w: (end) ╰──────────── get all admin from db ────────────╯
//
//w: (start)╭──────────── get admin by id from db ────────────╮
const getAdminByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};
//w: (end) ╰──────────── get admin by id from db ────────────╯

//w: (start)╭──────────── updateAdmin ────────────╮
const updateAdminIntoDB = async (
  id: string,
  data: Partial<Admin>,
): Promise<Admin> => {
  const result = await prisma.admin.update({
    where: {
      id,
      isDeleted: false,
    },
    data,
  });
  return result;
};
//w: (end) ╰──────────── updateAdmin ────────────╯

//
//w: (start)╭──────────── deleteAdmin ────────────╮
const deleteAdminFromDB = async (id: string): Promise<Admin | null> => {
  console.log(id, "[1;31mid in admin.service.ts at line 120[0m");
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (txClient) => {
    const adminDeletedData = await txClient.admin.delete({
      where: {
        id,
      },
    });

    await txClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });
    return adminDeletedData;
  });
  return result;
};

//w: (end) ╰──────────── deleteAdmin ────────────╯

//w: (start)╭──────────── softDeleteAdmin ────────────╮
const softDeleteAdminFromDB = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (txClient) => {
    const adminDeletedData = await txClient.admin.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    await txClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return adminDeletedData;
  });
  return result;
};
//w: (end) ╰──────────── softDeleteAdmin ────────────╯

export const AdminService = {
  getAllFromDB,
  getAdminByIdFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  softDeleteAdminFromDB,
};
