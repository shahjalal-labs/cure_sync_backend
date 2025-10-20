//
import { RequestHandler } from "express";
import { AdminService } from "./admin.service";

const getAll: RequestHandler = async (req, res) => {
  const params = req.query;
  try {
    const result = await AdminService.getAllFromDB(params);

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
