//
import { RequestHandler } from "express";

import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

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
export const AdminController = {
  getAll,
  getAdminById,
  updateAdmin,
};
