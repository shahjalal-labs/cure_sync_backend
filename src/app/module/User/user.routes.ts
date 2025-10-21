//
import express, { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
const router: Router = express.Router();

router.post("/", UserController.createAdmin);
router.get("/", validateRequest, UserController.getAllUsers);

export const UserRoutes: Router = router;
