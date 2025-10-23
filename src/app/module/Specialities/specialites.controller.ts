//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SpecialitiesService } from "./specialities.service";
import { sendResponse } from "../../../shared/sendResponse";
import { UserService } from "../User/user.service";

//w: (start)╭──────────── createSpecialities  ────────────╮
const createSpecialities = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialitiesService.createSpecialitiesIntoDB(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialities created successfully!",
    data: result,
  });
});
//w: (end) ╰──────────── createSpecialities  ────────────╯

//w: (start)╭──────────── getAllSpecialities ────────────╮

const getAllSpecialities = catchAsync(async (req, res) => {
  const result = await SpecialitiesService.getAllSpecialitiesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialities fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllSpecialities ────────────╯
export const SpecialitiesController = {
  createSpecialities,
  getAllSpecialities,
};
