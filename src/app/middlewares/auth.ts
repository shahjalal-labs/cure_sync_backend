//
import { Request, Response, NextFunction } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";

export const auth =
  (...roles: string[]) =>
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new Error("You are not authorized");

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret,
      );
      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("Forbidden");
      }
      next();
    } catch (error: any) {
      next(error);
    }
  };
