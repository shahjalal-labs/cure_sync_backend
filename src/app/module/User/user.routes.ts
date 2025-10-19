//
import express, { Router } from "express";
import { UserController } from "./user.controller";
const router: Router = express.Router();

router.post("/", UserController.createAdmin);

export const UserRoutes: Router = router;
