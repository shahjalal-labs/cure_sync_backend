//
import express from "express";
import { PatientController } from "./patient.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { PatientValidation } from "./patient.validation";

const router = express.Router();

router.get("/", PatientController.getAllPatient);

router.get("/:id", PatientController.getPatientById);

// hard delete patient
router.delete("/:id", PatientController.deletePatient);

router.delete("/soft/:id", PatientController.softDeletePatient);

router.patch(
  "/:id",
  validateRequest(PatientValidation.updatePatientSchema),
  PatientController.updatePatient,
);

export const PatientRoutes = router;
