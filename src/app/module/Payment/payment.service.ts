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

  const data = {
    store_id: config.ssl.storeId,
    store_passwd: config.ssl.storePass,
    // is_live: false,
    total_amount: paymentData.amount,
    currency: "BDT",
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: "http://localhost:3030/success",
    fail_url: config.ssl.successUrl,
    cancel_url: config.ssl.cancelUrl,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "N/A",
    product_name: "Appointment",
    product_category: "Healh Care",
    product_profile: "general",
    cus_name: paymentData.appointment.patent.name,
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const response = await axios({
    method: "post",
    url: config.ssl.sslPaymentApi,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(
    response.data,
    "[1;31mresponse in payment.service.ts at line 44[0m",
  );
};
//w: (end)  ╰──────────── initPayment ────────────╯

export const PaymentService = {
  initPayment,
};
