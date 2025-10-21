import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

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
const refreshToken = async (req, res) => {};
//w: (end) ╰────────────  ────────────╯
export const AuthController = {
  loginUser,
};
