//
import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validateRequest =
  (schema: ZodObject<ZodRawShape>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
