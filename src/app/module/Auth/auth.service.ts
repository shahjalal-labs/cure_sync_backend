import { UserStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

type ILoginPayload = {
  email: string;
  password: string;
};

const loginUserIntoDB = async (payload: ILoginPayload) => {
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

  const jwtSecret = process.env.JWT_SECRET;

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    jwtSecret as string,
    "5m",
  );
};

export const AuthService = {
  loginUserIntoDB,
};
