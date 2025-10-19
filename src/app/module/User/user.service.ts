//
import { PrismaClient, UserRole } from "../../../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const createAdminIntoDB = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 12);
  console.log(
    hashedPassword,
    "[1;31mhashedPassword in user.service.ts at line 7[0m",
  );

  const userData = {
    email: data.email,
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

export const UserService = {
  createAdminIntoDB,
};
