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
// router.post('refresh-token', AuthController.'')

export const AuthRoutes = router;
