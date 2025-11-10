//
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import httpStatus from "http-status";

//w: (start)╭──────────── initPayment ────────────╮
const initPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.initPayment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initialized successfully",
    data: result,
  });
});
//w: (end)  ╰──────────── initPayment ────────────╯

//w: (start)╭──────────── validatePayment ────────────╮
const validatePayment = catchAsync(async (req, res) => {
  const result = await PaymentService.validatePayment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment validation successful",
    data: result,
  });
});
//w: (end)  ╰──────────── validatePayment ────────────╯

export const PaymentController = {
  initPayment,
  validatePayment,
};
