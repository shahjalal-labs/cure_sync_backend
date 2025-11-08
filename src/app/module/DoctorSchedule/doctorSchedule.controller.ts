//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAuthUser } from "../../interfaces/common";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { doctorScheduleFilterableFields } from "./doctorSchedule.constant";

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

//w: (start)╭──────────── getMySchedules   ────────────╮
const getMySchedules = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res: Response,
  ) => {
    const user = req.user;

    const filters = pick(req.query, doctorScheduleFilterableFields);

    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await DoctorScheduleService.getMySchedules(
      filters,
      options,
      user as IAuthUser,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedules fetched successfully!",
      data: result,
    });
  },
);
//w: (end)  ╰──────────── getMySchedules   ────────────╯

//w: (start)╭──────────── deleteDoctorSchedule ────────────╮
const deleteDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
});
//w: (end)  ╰──────────── deleteDoctorSchedule ────────────╯

//w: (start)╭────────────   ────────────╮

//w: (end)  ╰────────────   ────────────╯
export const DoctorScheduleController = {
  createDoctorSchedule,
  getMySchedules,
  deleteDoctorSchedule,
};
