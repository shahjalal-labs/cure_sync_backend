//w: (start)╭────────────  ────────────╮

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import { sendResponse } from "../../../shared/sendResponse";

const getSchedulById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.deleteScheduleFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Schedule fetched successfully",
    data: result,
});
}

//w: (end) ╰────────────  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

export const ScheduleController = {
  getSchedulById,
};
