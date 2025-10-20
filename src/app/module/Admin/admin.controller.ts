//
import { RequestHandler } from "express";
import { AdminService } from "./admin.service";

const getAll: RequestHandler = async (req, res) => {
  const search = req.query.searchTerm;
console.log(search, "[1;31msearch in admin.controller.ts at line 7[0m");
  try {
    const result = await AdminService.getAllFromDB(search);

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
