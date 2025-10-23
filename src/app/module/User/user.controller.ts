//
import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
//w: (start)╭──────────── createAdmin ────────────╮
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdminIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});
//w: (end) ╰──────────── createAdmin ────────────╯

//w: (start)╭──────────── getAllUsers ────────────╮
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllUsers ────────────╯

export const UserController = {
  createAdmin,
  getAllUsers,
};
