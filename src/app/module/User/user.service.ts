//
import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";

const createAdminIntoDB = async (data: any) => {
  console.log(data, "[1;31mdata in user.service.ts at line 8[0m");
  console.log(`password`, data.password);
  const hashedPassword = await bcrypt.hash(data?.password, 12);
  console.log(
    hashedPassword,
    "[1;31mhashedPassword in user.service.ts at line 7[0m",
  );

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
