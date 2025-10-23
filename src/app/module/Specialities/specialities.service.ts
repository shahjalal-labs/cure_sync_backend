//
import { Request } from "express";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { prisma } from "../../../shared/prisma";
import { Specialities } from "@prisma/client";

//w: (start)╭──────────── createSpecialitiesIntoDB  ────────────╮
const createSpecialitiesIntoDB = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialities.create({
    data: req.body,
  });
  return result;
};
//w: (end) ╰──────────── createSpecialitiesIntoDB  ────────────╯

//w: (start)╭──────────── getAll specialities from db   ────────────╮
const getAllSpecialitiesFromDB = async (): Promise<Specialities[]> => {
  return await prisma.specialities.findMany();
};
//w: (end) ╰──────────── getAll specialities from db  ────────────╯

//w: (start)╭──────────── deleteSpecialitiesFromDB  ────────────╮
const deleteSpecialitiesFromDB = async (id: string): Promise<Specialities> => {
  const result = await prisma.specialities.delete({
    where: {
      id,
    },
  });
  return result;
};
//w: (end) ╰──────────── deleteSpecialitiesFromDB  ────────────╯

export const SpecialitiesService = {
  createSpecialitiesIntoDB,
  getAllSpecialitiesFromDB,
  deleteSpecialitiesFromDB,
};
