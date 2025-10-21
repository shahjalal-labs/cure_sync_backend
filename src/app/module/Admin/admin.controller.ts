//
import { RequestHandler } from "express";

import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

//w: (start)╭──────────── get all admin ────────────╮
const getAll: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AdminService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All admins fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
//w: (end) ╰──────────── get all admin ────────────╯

//w: (start)╭──────────── get admin by id  ────────────╮

const getAdminById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminService.getAdminByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});
//
//w: (end) ╰──────────── get admin by id  ────────────╯

//
//w: (start)╭──────────── updateAdmin ────────────╮

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminService.updateAdminIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});
//w: (end) ╰──────────── updateAdmin ────────────╯

//w: (start)╭──────────── deleteAdmin ────────────╮
const deleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminService.deleteAdminFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
//w: (end) ╰──────────── deleteAdmin ────────────╯

//w: (start)╭──────────── softDeleteAdmin ────────────╮

const softDeleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminService.softDeleteAdminFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully.",
    data: result,
  });
});
//w: (end) ╰──────────── softDeleteAdmin ────────────╯

export const AdminController = {
  getAll,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
