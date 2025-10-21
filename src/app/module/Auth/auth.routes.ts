//
import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidationSchema } from "./auth.validation";
const router = express.Router();

router.post(
  "/",
  validateRequest(AuthValidationSchema.userLoginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
