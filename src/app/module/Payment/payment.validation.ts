import { z } from "zod";

//w: (start)╭──────────── initPayment Validation ────────────╮
const initPayment = z.object({
  params: z.object({
    id: z.string().uuid("Invalid payment ID format"),
  }),
});

export type TInitPaymentParams = z.infer<typeof initPayment>["params"];
//w: (end)  ╰──────────── initPayment Validation ────────────╯

export const PaymentValidation = {
  initPayment,
};
