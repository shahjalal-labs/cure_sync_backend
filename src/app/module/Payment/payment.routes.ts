//
import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

//w: (start)╭──────────── initPayment ────────────╮
router.post("/init", PaymentController.initPayment);
//w: (end)  ╰──────────── initPayment ────────────╯

export const PaymentRoutes = router;
