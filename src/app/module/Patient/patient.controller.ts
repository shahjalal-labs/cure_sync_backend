import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { PatientService } from "./patient.service";
import httpStatus from "http-status";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.getAllPatient();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All patient fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllPatient  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const PatientController = {
  getAllPatient,
};
