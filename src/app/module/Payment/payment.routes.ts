//
import express from "express";
import { PaymentController } from "./payment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { PaymentValidation } from "./payment.validation";

const router = express.Router();

//w: (start)╭──────────── initPayment ────────────╮
router.post(
  "/init/:id",
  // validateRequest(PaymentValidation.initPayment),
  PaymentController.initPayment,
);
//w: (end)  ╰──────────── initPayment ────────────╯

//w: (start)╭──────────── validatePayment ────────────╮
router.get("/ipn", PaymentController.validatePayment);
//w: (end)  ╰──────────── validatePayment ────────────╯

// router.get("/all", PaymentController.getAllPayment);

export const PaymentRoutes = router;
