import httpStatus from "http-status";

import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";

//w: (start)╭──────────── getAllDoctor  ────────────╮
const getAllDoctor = catchAsync(async (req, res) => {
  const result = await DoctorService.getAllDoctor();
  sendResponse(res, {
    statusCode: httpStatus.OK,
  });
});
//w: (end) ╰──────────── getAllDoctor  ────────────╯

export const DoctorController = {
  getAllDoctor,
};
