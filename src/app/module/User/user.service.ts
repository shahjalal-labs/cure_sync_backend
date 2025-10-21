//
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";

const createAdminIntoDB = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data?.password, 12);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (txClient) => {
    await txClient.user.create({
      data: userData,
    });

    const createdAdminData = await txClient.admin.create({
      data: data.admin,
    });
    return createdAdminData;
  });
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserService = {
  createAdminIntoDB,
  getAllUsersFromDB,
};
