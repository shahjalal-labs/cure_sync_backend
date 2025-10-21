import { UserStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";

type ILoginPayload = {
  email: string;
  password: string;
};

const loginUserIntoDB = async (payload: ILoginPayload) => {
  console.log(`logging in user`);
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isPasswordCorrect) throw new Error("Invalid password");
};

export const AuthService = {
  loginUserIntoDB,
};
