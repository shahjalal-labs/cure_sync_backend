//
import { PaymentStatus } from "@prisma/client";
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
  //this commenting as we  have not live production api, and ssl can't interact with local api
  /*   if (!payload || !payload.status || !(payload.status === "VALID")) {
    return {
      message: "Invalid Payment!",
    };
  }

  const response = await SSLService.validatePayment(payload);
  if (response?.status !== "VALID") {
    return {
      message: "Payment failed!",
    };
  } */

  const response = payload; // this line will be commented when production api
  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGateWayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });

  return {
    message: "Payment success!",
  };
};
//w: (end)  ╰──────────── validatePayment ────────────╯

//w: (start)╭──────────── getAllPayment ────────────╮
const getAllPayment = async () => {
  const paymentData = await prisma.payment.findMany();
  return paymentData;
};
//w: (end)  ╰──────────── getAllPayment ────────────╯

export const PaymentService = {
  initPayment,
  validatePayment,
  getAllPayment,
};
