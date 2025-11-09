//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAuthUser } from "../../interfaces/common";
import { AppointmentService } from "./appointment.service";
import { sendResponse } from "../../../shared/sendResponse";

//w: (start)╭──────────── createAppointment ────────────╮
const createAppointment = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res: Response,
  ) => {
    const { user, body } = req;

    const result = await AppointmentService.createAppointment(user, body);
    sendResponse(res, {
      statusCode: httpS,
    });
  },
);
//w: (end)  ╰──────────── createAppointment ────────────╯

export const AppointmentController = {
  createAppointment,
};
