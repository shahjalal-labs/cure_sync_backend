//
import express, {
  RequestHandler,
  Router,
  Request,
  Response,
  NextFunction,
} from "express";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
const router: Router = express.Router();

const auth =
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

router.post("/", auth(UserRole.SUPER_ADMIN), UserController.createAdmin);
router.get("/", UserController.getAllUsers);

export const UserRoutes: Router = router;
