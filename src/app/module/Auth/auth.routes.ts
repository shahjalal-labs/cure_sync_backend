//
import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidationSchema } from "./auth.validation";
import { auth } from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/",
  validateRequest(AuthValidationSchema.userLoginValidationSchema),
  AuthController.loginUser,
);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/change-password",
  auth(),
  validateRequest(AuthValidationSchema.changePasswordValidationSchema),
  AuthController.changePassword,
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidationSchema.forgotPasswordValidationSchema),
  auth(),
  AuthController.forgotPassword,
);

export const AuthRoutes = router;
