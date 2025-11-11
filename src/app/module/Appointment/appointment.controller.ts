//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAuthUser } from "../../interfaces/common";
import { AppointmentService } from "./appointment.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";

//w: (start)╭──────────── createAppointment ────────────╮
const createAppointment = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res: Response,
  ) => {
    const { user, body } = req;

    const result = await AppointmentService.createAppointment(
      user as IAuthUser,
      body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment created successfully",
      data: result,
    });
  },
);
//w: (end)  ╰──────────── createAppointment ────────────╯

//w: (start)╭──────────── getMyAppointment ────────────╮
const getMyAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ["paymentStatus", "status"]);
    const options = pick(req.query, ["page", "limit", "sortOrder", "sortBy"]);

    const { user } = req;
    const result = await AppointmentService.getMyAppointment(
      user as IAuthUser,
      filters,
      options,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All appointment fetched successfully",
      data: result,
    });
  },
);
//w: (end)  ╰──────────── getMyAppointment ────────────╯

//w: (start)╭──────────── changeAppointmentStatus ────────────╮

const changeAppointmentStatus = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    const { status } = req.body;
    const result = await AppointmentService.changeAppointmentStatus(
      id,
      status,
      user as IAuthUser,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment status changed successfully",
      data: result,
    });
  },
);
//w: (end)  ╰──────────── changeAppointmentStatus ────────────╯

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
  changeAppointmentStatus,
};
