import catchAsync from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { sendResponse } from "../../../shared/sendResponse";
import { PrescriptionService } from "./prescription.service";
import httpStatus from "http-status";

//w: (start)╭──────────── getAllPrescriptions ────────────╮
const getAllPrescriptions = catchAsync(async (req, res) => {
  const filters = pick(req.query, []);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PrescriptionService.getAllPrescriptions(
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescriptions fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});
//w: (end)  ╰──────────── getAllPrescriptions ────────────╯

export const PrescriptionController = {
  getAllPrescriptions,
};
