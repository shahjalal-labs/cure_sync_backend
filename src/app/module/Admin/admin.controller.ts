//
import { RequestHandler } from "express";
import { AdminService } from "./admin.service";

const getAll: RequestHandler = async (req, res) => {
  const params = req.query;
  const pick = (obj, keys) => {
    console.log(`obj, keys`, obj, keys);
    for (const key of keys) {
      if (obj && Object.hasOwnProperty.call(obj, key)) {
        ("");
      }
    }
  };

  pick(params, ["name", "email", "contactNumber"]);

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
