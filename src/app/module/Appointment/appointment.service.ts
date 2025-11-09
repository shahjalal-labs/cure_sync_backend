//
import { prisma } from "../../../shared/prisma";
import { IAuthUser } from "../../interfaces/common";
import { v4 as uuidv4 } from "uuid";
import { TCreateAppointment } from "./appointment.validation";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { Prisma, UserRole } from "@prisma/client";

//w: (start)╭──────────── createAppointment ────────────╮
const createAppointment = async (
  user: IAuthUser,
  payload: TCreateAppointment,
) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId: string = uuidv4();

  const today = new Date();
  const transactionId =
    "Cure-Sync-" +
    today.getFullYear() +
    "-" +
    today.getMonth() +
    "-" +
    today.getDay() +
    "-" +
    "-" +
    today.getHours() +
    "-" +
    today.getSeconds();

  const result = await prisma.$transaction(async (tx) => {
    const appointmentData = await tx.appointment.create({
      data: {
        patientId: patientData.id,
        doctorId: doctorData.id,
        scheduleId: payload.scheduleId,
        videoCallingId,
      },
      include: {
        patent: true,
        doctor: true,
        schedule: true,
        payment: true,
      },
    });

    await tx.doctorSchedules.update({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorData.id,
          scheduleId: payload.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointmentData.id,
      },
    });

    await tx.payment.create({
      data: {
        appointmentId: appointmentData.id,
        amount: doctorData.appointmentFee,
        transactionId,
      },
    });

    return appointmentData;
  });
  return result;
};

//w: (end)  ╰──────────── createAppointment ────────────╯

//w: (start)╭──────────── getMyAppointment ────────────╮
const getMyAppointment = async (
  user: IAuthUser,
  filters: any,
  options: IPaginationOptions,
) => {
  const { limit, page, skip } = paginationHelper.calcalutePagination(options);
  const { ...filterData } = filters;

  const andConditions: Prisma.AppointmentWhereInput[] = [];

  if (user?.role === UserRole.PATIENT) {
    andConditions.push({
      patent: {
        email: user?.email,
      },
    });
  } else if (UserRole.DOCTOR) {
    andConditions.push({
      doctor: {
        email: user?.email,
      },
    });
  }

  if (Object.keys(filterData).length) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: filterData[key],
      },
    }));
    andConditions.push(...filterConditions);
  }

  const whereConditions: Prisma.AppointmentWhereInput = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};

  const result = await prisma.appointment.findMany({
    where: whereConditions,
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
    include: user.role ===UserRole.PATIENT ? {
  
    }
    /* include: {
      schedule: true,
      [user?.role === UserRole.PATIENT ? "patent" : "doctor"]: true,
    } */
  });

  return result;
};

//w: (end)  ╰──────────── getMyAppointment ────────────╯

export const AppointmentService = {
  createAppointment,
  getMyAppointment,
};
