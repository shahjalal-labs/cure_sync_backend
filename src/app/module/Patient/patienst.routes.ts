//
import express from "express";
import { PatientController } from "./patient.controller";

const router = express.Router();

router.get("/", PatientController.getAllPatient);

router.get("/:id", PatientController.getPatientById);

router.delete("/soft/:id", PatientController.softDeletePatient);

router.patch("/:id", PatientController.updatePatient);

export const PatientRoutes = router;
