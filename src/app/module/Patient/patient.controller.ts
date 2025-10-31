//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { PatientService } from "./patient.service";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { patientFilterableFields } from "./patient.constant";
import { Patient } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { ApiError } from "../../errors/ApiError";

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

  if (!result) throw new ApiError(404, "Patient not found.");

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient fetched successfully.",
    data: result,
  });
});

//w: (end) ╰──────────── getPatientById ────────────╯

//w: (start)╭──────────── softDeletePatient  ────────────╮
const softDeletePatient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PatientService.softDeletePatient(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient deleted successfully.",
    data: result,
  });
});
//w: (end) ╰──────────── softDeletePatient  ────────────╯

//w: (start)╭──────────── updatePatient  ────────────╮
const updatePatient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PatientService.updatePatient(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient updated successfully.",
    data: result,
  });
});
//w: (end) ╰──────────── updatePatient  ────────────╯

//w: (start)╭──────────── deletePatient  ────────────╮
const deletePatient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PatientService.deletePatient(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient deleted successfully.",
    data: result,
  });
});
//w: (end) ╰──────────── deletePatient  ────────────╯

export const PatientController = {
  getAllPatient,
  getPatientById,
  softDeletePatient,
  updatePatient,
  deletePatient,
};
