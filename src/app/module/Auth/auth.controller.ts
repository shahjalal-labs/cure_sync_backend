import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

//w: (start)╭──────────── loginUser  ────────────╮
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserIntoDB(req.body);

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});
//w: (end) ╰──────────── loginUser  ────────────╯

//w: (start)╭────────────  ────────────╮
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  console.log(
    refreshToken,
    "[1;31mrefreshToken in auth.controller.ts at line 36[0m",
  );

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "issued refresh token successfully",
    data: result,
  });
});
//w: (end) ╰────────────  ────────────╯
export const AuthController = {
  loginUser,
  refreshToken,
};
