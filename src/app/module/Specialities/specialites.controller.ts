//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SpecialitiesService } from "./specialities.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";

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
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialities fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllSpecialities ────────────╯

//w: (start)╭──────────── deleteSpecialities────────────╮
const deleteSpecialities = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialitiesService.deleteSpecialitiesFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialities deleted successfully",
    data: result,
  });
});
//w: (end) ╰──────────── deleteSpecialities────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

export const SpecialitiesController = {
  createSpecialities,
  getAllSpecialities,
  deleteSpecialities,
};
