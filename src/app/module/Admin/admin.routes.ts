//
import express from "express";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AdminValidationSchema } from "./admin.validation";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const router = express.Router();

router.get(
  "/",
  (r, s, n) => {
    const token = jwtHelpers.generateToken(
      {
        userid: "userId",
        role: "ADMIN",
      },
      "secret",
      "1h",
    );

    console.log(token, "[1;31mtoken in admin.routes.ts at line 14[0m");

    n();
  },
  AdminController.getAll,
);
router.get("/:id", AdminController.getAdminById);
router.patch(
  "/:id",
  validateRequest(AdminValidationSchema.updateAdminValidationSchema),
  AdminController.updateAdmin,
);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
