//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAuthUser } from "../../interfaces/common";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";

//w: (start)╭──────────── createDoctorSchedule   ────────────╮
const createDoctorSchedule = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res: Response,
  ) => {
    const user = req.user;

    const result = await DoctorScheduleService.createDoctorSchedule(
      user as IAuthUser,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Schedule created successfully!",
      data: result,
    });
  },
);
//w: (end)  ╰──────────── createDoctorSchedule   ────────────╯

//w: (start)╭────────────   ────────────╮

//w: (end)  ╰────────────   ────────────╯
export const DoctorScheduleController = {
  createDoctorSchedule,
};
