import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();
const createAdminIntoDB = async (data: any) => {
  const result = await prisma.$transaction(async (txClient) => {
    await txClient.user.create({
      data: data,
    });
  });
  return result;
};

export const UserService = {
  createAdminIntoDB,
};
