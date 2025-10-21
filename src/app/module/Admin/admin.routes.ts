//
import express from "express";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidationSchema } from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAll);
router.get("/:id", AdminController.getAdminById);
router.patch(
  "/:id",
  validateRequest(AdminValidationSchema.updateAdminValidationSchema),
  AdminController.updateAdmin,
);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
