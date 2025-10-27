import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { PatientService } from "./patient.service";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { patientFilterableFields } from "./patient.constant";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields);

  const options = pick(req.query, ["page", "limit", "sortOrder", "sortBy"]);
  const result = await PatientService.getAllPatient(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All patient fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllPatient  ────────────╯

//w: (start)╭──────────── getPatientById ────────────╮

const getPatientById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PatientService.getPatientById(id);
});

//w: (end) ╰──────────── getPatientById ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const PatientController = {
  getAllPatient,
  getPatientById,
};
