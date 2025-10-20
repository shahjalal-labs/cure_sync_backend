//
import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAll);
router.get("/:id", AdminController.getAdminById);
router.patch("/:id", AdminController.updateAdmin);

export const AdminRoutes = router;
