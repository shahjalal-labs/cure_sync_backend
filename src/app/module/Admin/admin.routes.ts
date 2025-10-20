//
import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAll);
router.get("/:id", AdminController.getAdminById);

export const AdminRoutes = router;
