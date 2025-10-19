//
import express, { Router } from "express";
import { UserController } from "./user.controller";
const router: Router = express.Router();

router.get("/", UserController.createAdmin);

export const UserRoutes: Router = router;
