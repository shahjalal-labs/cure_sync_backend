//
import { UserStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
type ILoginPayload = {
  email: string;
  password: string;
};

//w: (start)╭──────────── loginUserIntoDB ────────────╮
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
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    "30d",
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};
//w: (end) ╰──────────── loginUserIntoDB ────────────╯

//w: (start)╭──────────── refreshToken  ────────────╮
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
    );
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    process.env.JWT_SECRET as string,
    "5m",
  );
  return accessToken;
};
//
//w: (end) ╰──────────── refreshToken  ────────────╯
export const AuthService = {
  loginUserIntoDB,
  refreshToken,
};
