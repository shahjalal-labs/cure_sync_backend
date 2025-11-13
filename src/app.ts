//
import express, { Application, RequestHandler } from "express";
import cors from "cors";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { AppointmentService } from "./app/module/Appointment/appointment.service";

export const app: Application = express();

// cors
app.use(cors());
//pareser
app.use(express.json());
app.use(cookieParser());

// node-cron package is for calling a function after certain time
cron.schedule("* * * * *", () => {
  try {
    AppointmentService.cancelUnpaidAppointments();
    console.log("cron job is running");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

// cancelUnpaidAppointments();
app.get("/", (req, res) => {
  res.send({
    message: "cure_sync server running...",
  });
});
