//
import { RequestHandler } from "express";

const catchAsync = (fn: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
};

export default catchAsync;
