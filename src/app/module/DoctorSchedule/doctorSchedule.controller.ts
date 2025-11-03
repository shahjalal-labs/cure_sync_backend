//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAuthUser } from "../../interfaces/common";
import { DoctorScheduleService } from "./doctorSchedule.service";

const createDoctorSchedule = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res: Response,
  ) => {
    const user = req.user;

    const result = await DoctorScheduleService.createDoctorSchedule(
      user,
      req.body,
    );
  },
);

export const DoctorScheduleController = {
  createDoctorSchedule,
};
