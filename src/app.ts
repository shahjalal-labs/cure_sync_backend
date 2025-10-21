//
import express, { Application } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { UserRoutes } from "./app/module/User/user.routes";
import { AdminRoutes } from "./app/module/Admin/admin.routes";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

export const app: Application = express();

app.use(cors());
//pareser
app.use(express.json());

// app.use("/api/v1/user", UserRoutes);
// app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1", router);
app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send({
    message: "cure_sync server running...",
  });
});
