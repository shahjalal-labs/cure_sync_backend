//
import { RequestHandler } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";

const createAdmin: RequestHandler = async (req, res) => {
  const result = await UserService.createAdminIntoDB(req.body);
  res.send({
    message: "Hello World",
    data: result,
  });
};

const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const result = await UserService.getAllUsersFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All users fetched successfully",
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

export const UserController = {
  createAdmin,
  getAllUsers,
};
