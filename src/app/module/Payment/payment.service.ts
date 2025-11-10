//
import { prisma } from "../../../shared/prisma";
import { SSLService } from "../SSL/ssl.service";

//w: (start)╭──────────── initPayment ────────────╮
const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findUniqueOrThrow({
    where: {
      id: appointmentId,
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
    phoneNumber: paymentData.appointment.patent.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);
  return result;
};
//w: (end)  ╰──────────── initPayment ────────────╯

export const PaymentService = {
  initPayment,
};
