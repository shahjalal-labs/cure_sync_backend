//
import { Admin, Doctor, Patient, Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../shared/prisma";
import { Request } from "express";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { userSearchableFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";
import { TUpdateMyProfile } from "./user.validation";

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

    const createdDoctor = await txClient.doctor.create({
      data: req.body.doctor,
    });
    return createdDoctor;
  });
  return result;
};
//w: (end) ╰──────────── createDoctor  ────────────╯
//
//w: (start)╭──────────── create patient  ────────────╮
const createPatientIntoDB = async (req: Request): Promise<Patient> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.patient.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (txClient) => {
    await txClient.user.create({
      data: userData,
    });

    const createdPatient = await txClient.patient.create({
      data: req.body.patient,
    });
    return createdPatient;
  });
  return result;
};
//w: (end) ╰──────────── create  patient  ────────────╯

//w: (start)╭──────────── changeProfileStatus  ────────────╮
const changeProfileStatus = async (id: string, status: UserRole) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
  });
  return updateUserStatus;
};

//w: (end) ╰──────────── changeProfileStatus  ────────────╯

//w: (start)╭──────────── getAllUsersFromDB  ────────────╮
const getAllUsersFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calcalutePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  //console.log(filterData);
  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.UserWhereInput =
    andCondions.length > 0 ? { AND: andCondions } : {};

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      patient: true,
      doctor: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//w: (end) ╰──────────── getAllUsersFromDB  ────────────╯

//w: (start)╭──────────── getMyProfileFromDB  ────────────╮
const getMyProfileFromDB = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  let profileInfo;
  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }
  return { ...userInfo, ...profileInfo };
};
//w: (end) ╰──────────── getMyProfileFromDB  ────────────╯
//
//w: (start)╭──────────── updateMyProfile  ────────────╮
const updateMyProfile = async (
  user: IAuthUser,
  req: Request<
    unknown,
    unknown,
    TUpdateMyProfile & {
      profilePhoto?: string;
    }
  > & {},
): Promise<Admin | Doctor | Patient | null> => {
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url;
  }
  let updatedUser: Admin | Doctor | Patient | null = null;

  if (existingUser.role === UserRole.ADMIN) {
    updatedUser = await prisma.admin.update({
      where: {
        email: existingUser.email,
      },
      data: req.body,
    });
  } else if (existingUser.role === UserRole.DOCTOR) {
    updatedUser = await prisma.doctor.update({
      where: {
        email: existingUser.email,
      },
      data: {
        ...req.body,
      },
    });
  } else if (existingUser.role === UserRole.PATIENT) {
    updatedUser = await prisma.patient.update({
      where: {
        email: existingUser.email,
      },
      data: req.body,
    });
  }
  return updatedUser;
};

//w: (end) ╰──────────── updateMyProfile  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const UserService = {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
  getAllUsersFromDB,
  changeProfileStatus,
  getMyProfileFromDB,
  updateMyProfile,
};
