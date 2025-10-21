//
import express, { Application, RequestHandler } from "express";
import cors from "cors";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

export const app: Application = express();

// cors
app.use(cors());
//pareser
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req, res) => {
  res.send({
    message: "cure_sync server running...",
  });
});
