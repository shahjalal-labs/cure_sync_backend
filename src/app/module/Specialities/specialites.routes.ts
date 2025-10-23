//
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUploader";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.body.data;
  },
);

export const SpecialitiesRoutes = router;
