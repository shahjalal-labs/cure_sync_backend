//
import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

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

//w: (start)╭──────────── createDoctor  ────────────╮
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctorIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});
//w: (end) ╰──────────── createDoctor  ────────────╯

//w: (start)╭──────────── createPatient  ────────────╮
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatientIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});
//w: (end) ╰──────────── createPatient  ────────────╯

//w: (start)╭──────────── changeProfileStatus  ────────────╮
const changeProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await UserService.changeProfileStatus(id, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile status changed successfully",
    data: result,
  });
});
//w: (end) ╰──────────── changeProfileStatus  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const UserController = {
  createAdmin,
  getAllUsers,
  createDoctor,
  createPatient,
  changeProfileStatus,
};
