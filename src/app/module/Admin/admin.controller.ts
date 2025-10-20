//
import { RequestHandler } from "express";

import { AdminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAll: RequestHandler = async (req, res) => {
  const filters = pick(req.query, adminFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  try {
    const result = await AdminService.getAllFromDB(filters, options);

    res.status(200).json({
      success: true,
      message: "All admins fetched successfully",
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

export const AdminController = {
  getAll,
};
