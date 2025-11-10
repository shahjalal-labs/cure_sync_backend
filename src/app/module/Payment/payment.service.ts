//

import axios from "axios";
import config from "../../../config";
import { prisma } from "../../../shared/prisma";

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
};
//w: (end)  ╰──────────── initPayment ────────────╯

export const PaymentService = {
  initPayment,
};
