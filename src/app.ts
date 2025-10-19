//
import express, { Application } from "express";
import cors from "cors";
import { UserRoutes } from "./app/module/User/user.routes";

export const app: Application = express();

app.use(cors());

app.use("/api/v1/user", UserRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "cure_sync server running...",
  });
});
