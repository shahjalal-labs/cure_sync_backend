//
import { Admin, Doctor, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import { Request } from "express";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
//w: (start)╭──────────── createAdminIntoDB  ────────────╮
const createAdminIntoDB = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (txClient) => {
    await txClient.user.create({
      data: userData,
    });

    const createdAdminData = await txClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });
  return result;
};
//w: (end) ╰──────────── createAdminIntoDB  ────────────╯

//w: (start)╭──────────── getAllUsersFromDB  ────────────╮
const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany();
  return result;
};
//w: (end) ╰──────────── getAllUsersFromDB  ────────────╯

//w: (start)╭──────────── createDoctor  ────────────╮
const createDoctorIntoDB = async (req: Request): Promise<Doctor> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (txClient) => {
    await txClient.user.create({
      data: userData,
    });

    const createdDoctor = await prisma.doctor.create({
      data: req.body.doctor,
    });
    return createdDoctor;
  });
  return result;
};

//w: (end) ╰──────────── createDoctor  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const UserService = {
  createAdminIntoDB,
  getAllUsersFromDB,
  createDoctorIntoDB,
};
