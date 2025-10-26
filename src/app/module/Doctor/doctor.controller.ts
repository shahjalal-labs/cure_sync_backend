import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";
import { Request, Response } from "express";

//w: (start)╭──────────── getAllDoctor  ────────────╮
const getAllDoctor = catchAsync(async (req, res) => {
  const result = await DoctorService.getAllDoctor();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All doctor fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllDoctor  ────────────╯

//w: (start)╭──────────── getDoctorById  ────────────╮
const getDoctorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.getDoctorById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getDoctorById  ────────────╯

//w: (start)╭──────────── updateDoctor  ────────────╮
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorService.updateDoctor();
});
//w: (end) ╰──────────── updateDoctor  ────────────╯

//
//w: (start)╭──────────── softDeleteDoctor  ────────────╮
const softDeleteDoctor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.softDeleteDoctor(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});
//w: (end) ╰──────────── softDeleteDoctor  ────────────╯

//w: (start)╭──────────── deleteDoctor ────────────╮
const deleteDoctor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DoctorService.deleteDoctor(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});
//w: (end) ╰──────────── deleteDoctor ────────────╯

export const DoctorController = {
  getAllDoctor,
  softDeleteDoctor,
  deleteDoctor,
  updateDoctor,
  getDoctorById,
};
