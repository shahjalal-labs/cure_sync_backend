//
import express, { Router } from "express";
import { UserController } from "./user.controller";
const router: Router = express.Router();

router.post("/", UserController.createAdmin);
router.get("/", UserController.getAllUsers);

export const UserRoutes: Router = router;
