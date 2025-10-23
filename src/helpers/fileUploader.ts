//
import { v2 as clouadinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";

clouadinary.config({
  cloud_name: "root",
  api_key: "225611373532826",
  api_secret: "3MKG91TQ5twmBzYk2Vd6vabHVDc",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const uploadToCloudinary = async (
  file: IFile,
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    clouadinary.uploader.upload(
      file.path,
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
