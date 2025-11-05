//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { scheduleFilterableFields } from "./schedule.constant";
import { IAuthUser } from "../../interfaces/common";

//w: (start)╭──────────── getSchedulById  ────────────╮
const getSchedulById = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.getAllSchedules();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully fetched schedule",
    data: result,
  });
});
//w: (end) ╰──────────── getSchedulById  ────────────╯

//w: (start)╭──────────── deleteSchedule  ────────────╮
const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.deleteScheduleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted schedule",
    data: result,
  });
});
//w: (end) ╰──────────── deleteSchedule   ────────────╯

//w: (start)╭──────────── createSchedule  ────────────╮
const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.createSchedule(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule created Successfully.",
    data: result,
  });
});
//w: (end) ╰──────────── createSchedule ────────────╯

//w: (start)╭──────────── getAllSchedules  ────────────╮
const getAllSchedules = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res,
  ) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["page", "limit", "sortOrder", "sortBy"]);

    const user = req.user;
    const result = await ScheduleService.getAllSchedules(
      filters,
      options,
      user as IAuthUser,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully fetched schedules.",
      data: result,
    });
  },
);
//w: (end) ╰──────────── getAllSchedules  ────────────╯

export const ScheduleController = {
  getSchedulById,
  deleteSchedule,
  createSchedule,
  getAllSchedules,
};
