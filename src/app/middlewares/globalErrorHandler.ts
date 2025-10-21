//
import httpStatus from "http-status";
import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Something went wrong!",
    error,
  });
};
