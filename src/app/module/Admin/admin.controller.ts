//
import { RequestHandler, Response } from "express";

import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: T;
  },
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || null || undefined,
    data: jsonData.data || null || undefined,
  });
};

//w: (start)╭──────────── get all admin ────────────╮
const getAll: RequestHandler = async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  try {
    const result = await AdminService.getAllFromDB(filters, options);

    res.status(200).json({
      success: true,
      message: "All admins fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};
//w: (end) ╰──────────── get all admin ────────────╯

//w: (start)╭──────────── get admin by id from db ────────────╮

const getAdminById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await AdminService.getAdminByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};
//
//w: (end) ╰──────────── get admin by id from db ────────────╯

//
//w: (start)╭──────────── updateAdmin ────────────╮

const updateAdmin: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await AdminService.updateAdminIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};
//w: (end) ╰──────────── updateAdmin ────────────╯

//w: (start)╭──────────── deleteAdmin ────────────╮
const deleteAdmin: RequestHandler = async (req, res) => {
  try {
    const result = await AdminService.deleteAdminFromDB(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      data: error,
    });
  }
};
//w: (end) ╰──────────── deleteAdmin ────────────╯

//w: (start)╭──────────── softDeleteAdmin ────────────╮

const softDeleteAdmin: RequestHandler = async (req, res) => {
  try {
    const result = await AdminService.softDeleteAdminFromDB(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      data: err,
    });
  }
};
//w: (end) ╰──────────── softDeleteAdmin ────────────╯

export const AdminController = {
  getAll,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
