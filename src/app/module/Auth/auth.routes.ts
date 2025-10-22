//
import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidationSchema } from "./auth.validation";
import { auth } from "../../middlewares/auth";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "my_cloud_name",
  api_key: "my_key",
  api_secret: "my_secret",
});
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
  AuthController.forgotPassword,
);
router.post(
  "/reset-password",
  validateRequest(AuthValidationSchema.resetPasswordValidationSchema),
  AuthController.resetPassword,
);

export const AuthRoutes = router;
