//
import { prisma } from "../../../shared/prisma";
import { SSLService } from "../SSL/ssl.service";

//w: (start)╭──────────── initPayment ────────────╮
const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findUniqueOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patent: true,
        },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patent.name,
    email: paymentData.appointment.patent.email,
    address: paymentData.appointment.patent.address,
    phoneNumber: paymentData.appointment.patent.contactNumber,
  };
  const result = await SSLService.initPayment(initPaymentData);
  return {
    paymentUrl: result.GatewayPageURL,
  };
};
//w: (end)  ╰──────────── initPayment ────────────╯

//w: (start)╭──────────── validatePayment ────────────╮
const validatePayment = async (payload: any) => {
  if (!payload || !payload.status || !(payload.status === "VALID")) {
    return {
      message: "Invalid Payment!",
    };
  }

  const response = await SSLService;

  console.log(`working`);
};
//w: (end)  ╰──────────── validatePayment ────────────╯

export const PaymentService = {
  initPayment,
};
