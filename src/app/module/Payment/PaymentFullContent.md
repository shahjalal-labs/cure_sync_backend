# PaymentFullContent.md

## 🌲 Full Project Structure

```bash
/home/sj/web/ph/cure_sync/cure_sync_backend
├── bun.lock
├── ck.md
├── env.example
├── generated
│   └── prisma
│       ├── client.d.ts
│       ├── client.js
│       ├── default.d.ts
│       ├── default.js
│       ├── edge.d.ts
│       ├── edge.js
│       ├── index-browser.js
│       ├── index.d.ts
│       ├── index.js
│       ├── libquery_engine-debian-openssl-3.0.x.so.node
│       ├── package.json
│       ├── query_engine_bg.js
│       ├── query_engine_bg.wasm
│       ├── runtime
│       │   ├── edge-esm.js
│       │   ├── edge.js
│       │   ├── index-browser.d.ts
│       │   ├── index-browser.js
│       │   ├── library.d.ts
│       │   ├── library.js
│       │   ├── react-native.js
│       │   ├── wasm-compiler-edge.js
│       │   └── wasm-engine-edge.js
│       ├── schema.prisma
│       ├── wasm.d.ts
│       ├── wasm-edge-light-loader.mjs
│       ├── wasm.js
│       └── wasm-worker-loader.mjs
├── index.d.ts
├── index.d.ts.map
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20251019130336_user_admin_done
│   │   │   └── migration.sql
│   │   ├── 20251023032700_doctor
│   │   │   └── migration.sql
│   │   ├── 20251023034129_patient
│   │   │   └── migration.sql
│   │   ├── 20251023084901_specialites
│   │   │   └── migration.sql
│   │   ├── 20251023100413_schedule
│   │   │   └── migration.sql
│   │   ├── 20251023104052_medical_report
│   │   │   └── migration.sql
│   │   ├── 20251031171016_schedule_index
│   │   │   └── migration.sql
│   │   ├── 20251103163126_doctorschedule
│   │   │   └── migration.sql
│   │   ├── 20251109150609_appointment
│   │   │   └── migration.sql
│   │   ├── 20251109151433_payment
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
├── resources
│   ├── cure_sync_ERD.pdf
│   └── cure_sync_requiremnet.pdf
├── src
│   ├── app
│   │   ├── errors
│   │   │   └── ApiError.ts
│   │   ├── interfaces
│   │   │   ├── common.ts
│   │   │   ├── file.ts
│   │   │   └── pagination.ts
│   │   ├── middlewares
│   │   │   ├── auth.ts
│   │   │   ├── globalErrorHandler.ts
│   │   │   ├── notFound.ts
│   │   │   └── validateRequest.ts
│   │   ├── module
│   │   │   ├── Admin
│   │   │   │   ├── adminApi.hurl
│   │   │   │   ├── admin.constant.ts
│   │   │   │   ├── admin.controller.ts
│   │   │   │   ├── admin.interace.ts
│   │   │   │   ├── admin.routes.ts
│   │   │   │   ├── admin.service.ts
│   │   │   │   └── admin.validation.ts
│   │   │   ├── Appointment
│   │   │   │   ├── appoinment.api.hurl
│   │   │   │   ├── appointment.controller.ts
│   │   │   │   ├── appointment.routes.ts
│   │   │   │   ├── appointment.service.ts
│   │   │   │   └── appointment.validation.ts
│   │   │   ├── Auth
│   │   │   │   ├── authApi.hurl
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.validation.ts
│   │   │   ├── Doctor
│   │   │   │   ├── bulkDoctordata.json
│   │   │   │   ├── doctorApi.hurl
│   │   │   │   ├── doctor.constant.ts
│   │   │   │   ├── doctor.controller.ts
│   │   │   │   ├── doctor.interface.ts
│   │   │   │   ├── doctor.routes.ts
│   │   │   │   ├── doctor.service.ts
│   │   │   │   └── doctor.validation.ts
│   │   │   ├── DoctorSchedule
│   │   │   │   ├── doctorSchedule.api.hurl
│   │   │   │   ├── doctorSchedule.constant.ts
│   │   │   │   ├── doctorSchedule.controller.ts
│   │   │   │   ├── doctorSchedule.interface.ts
│   │   │   │   ├── doctorSchedule.routes.ts
│   │   │   │   ├── doctorSchedule.service.ts
│   │   │   │   └── doctorSchedule.validation.ts
│   │   │   ├── Patient
│   │   │   │   ├── patienst.routes.ts
│   │   │   │   ├── patientApi.hurl
│   │   │   │   ├── patient.constant.ts
│   │   │   │   ├── patient.controller.ts
│   │   │   │   ├── patientData.json
│   │   │   │   ├── patient.interface.ts
│   │   │   │   ├── patient.service.ts
│   │   │   │   └── patient.validation.ts
│   │   │   ├── Payment
│   │   │   │   ├── payment.api.hurl
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── payment.routes.ts
│   │   │   │   ├── payment.service.ts
│   │   │   │   └── payment.validation.ts
│   │   │   ├── Schedule
│   │   │   │   ├── schedule.api.hurl
│   │   │   │   ├── schedule.constant.ts
│   │   │   │   ├── schedule.controller.ts
│   │   │   │   ├── schedule.interface.ts
│   │   │   │   ├── schedule.routes.ts
│   │   │   │   ├── schedule.service.ts
│   │   │   │   └── schedule.validation.ts
│   │   │   ├── Specialities
│   │   │   │   ├── bulkSpecialitiesData.json
│   │   │   │   ├── specialites.controller.ts
│   │   │   │   ├── specialites.routes.ts
│   │   │   │   ├── specialites.validation.ts
│   │   │   │   ├── specialitiesApi.hurl
│   │   │   │   └── specialities.service.ts
│   │   │   └── User
│   │   │       ├── bulkPatientData.json
│   │   │       ├── doctorData.json
│   │   │       ├── patientData.json
│   │   │       ├── user2Api.hurl
│   │   │       ├── userApi.hurl
│   │   │       ├── user.constant.ts
│   │   │       ├── user.controller.ts
│   │   │       ├── user.interface.ts
│   │   │       ├── user.routes.ts
│   │   │       ├── user.service.ts
│   │   │       └── user.validation.ts
│   │   └── routes
│   │       └── index.ts
│   ├── app.ts
│   ├── config
│   │   └── index.ts
│   ├── docs
│   │   └── cli_commands.md
│   ├── helpers
│   │   ├── emailSender.ts
│   │   ├── fileUploader.ts
│   │   ├── jwtHelpers.ts
│   │   └── paginatonHelper.ts
│   ├── pr
│   │   └── obj.js
│   ├── server.ts
│   ├── shared
│   │   ├── catchAsync.ts
│   │   ├── obj.js
│   │   ├── pick.ts
│   │   ├── prisma.ts
│   │   └── sendResponse.ts
│   └── types
│       └── objectType.ts
├── structure.md
├── tsconfig.json
└── uploads
    └── l1b11ScicBlackBelt.png

41 directories, 144 files
```

## 📁 Payment Module Tree

```bash
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app/module/Payment
├── payment.api.hurl
├── payment.controller.ts
├── payment.routes.ts
├── payment.service.ts
└── payment.validation.ts

1 directory, 5 files
```

## 📋 schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

//w: (start)╭──────────── User   ────────────╮
model User {
  id                 String     @id @default(uuid())
  email              String     @unique
  password           String
  role               UserRole
  needPasswordChange Boolean    @default(true)
  status             UserStatus @default(ACTIVE)
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
  admin              Admin?
  doctor             Doctor?
  patient            Patient?

  @@map("users")
}

//w: (end)  ╰────────────  User  ────────────╯

//w: (start)╭──────────── Admin   ────────────╮
model Admin {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  profilePhoto  String?
  contactNumber String
  isDeleted     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  user User @relation(fields: [email], references: [email])

  @@map("admins")
}

//w: (end)  ╰──────────── Admin   ────────────╯

//w: (start)╭──────────── Doctor   ────────────╮
model Doctor {
  id                  String   @id @default(uuid())
  name                String
  email               String   @unique
  profilePhoto        String?
  contactNumber       String
  address             String?
  registrationNumber  String
  experience          Int      @default(0)
  gender              Gender
  appointmentFee      Int
  qualification       String
  currentWorkingPlace String
  designation         String
  isDeleted           Boolean  @default(false)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  user               User                 @relation(fields: [email], references: [email])
  doctorSpecialities DoctorSpecialities[]
  doctorSchedules    DoctorSchedules[]
  appointment        Appointment[]
  prescription       Prescription[]

  @@map("doctors")
}

//w: (end)  ╰──────────── Doctor   ────────────╯

//w: (start)╭──────────── Patient   ────────────╮
model Patient {
  id                String             @id @default(uuid())
  email             String             @unique
  name              String
  profilePhoto      String?
  contactNumber     String?
  address           String?
  isDeleted         Boolean            @default(false)
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
  user              User               @relation(fields: [email], references: [email])
  patientHealthData PatientHealthData?
  medicalReport     MedicalReport[]
  appointment       Appointment[]

  @@map("patients")
}

//w: (end)  ╰──────────── Patient   ────────────╯

//w: (start)╭──────────── Specialities   ────────────╮
model Specialities {
  id                 String               @id @default(uuid())
  title              String
  icon               String
  doctorSpecialities DoctorSpecialities[]

  @@map("specialities")
}

//w: (end)  ╰──────────── Specialities   ────────────╯

//w: (start)╭────────────  DoctorSpecialities  ────────────╮
model DoctorSpecialities {
  specialitiesId String
  specialities   Specialities @relation(fields: [specialitiesId], references: [id])
  doctorId       String
  doctor         Doctor       @relation(fields: [doctorId], references: [id])

  @@id([specialitiesId, doctorId])
  @@map("doctor_specialties")
}

//w: (end)  ╰──────────── DoctorSpecialities   ────────────╯

//w: (start)╭────────────  PatientHealthData  ────────────╮
model PatientHealthData {
  id                  String        @id @default(uuid())
  patientId           String        @unique
  patient             Patient       @relation(fields: [patientId], references: [id])
  gender              Gender
  dateOfBirth         String
  bloodGroup          BloodGroup
  hasAllergies        Boolean?      @default(false)
  hasDiabetes         Boolean?      @default(false)
  height              String
  weight              String
  smokingStatus       Boolean?      @default(false)
  dietaryPreferences  String?
  pregnancyStatus     Boolean?      @default(false)
  mentalHealthHistory String?
  immunizationStatus  String?
  hasPastSurgeries    Boolean?      @default(false)
  recentAnxiety       Boolean?      @default(false)
  recentDepression    Boolean?      @default(false)
  maritalStatus       MaritalStatus @default(UNMARRIED)
  createdAt           DateTime      @default(now())
  updatedAt           DateTime      @updatedAt

  @@map("patient_health_datas")
}

//w: (end)  ╰────────────  PatientHealthData  ────────────╯

//w: (start)╭──────────── MedicalReport   ────────────╮
model MedicalReport {
  id         String   @id @default(uuid())
  patientId  String
  patent     Patient  @relation(fields: [patientId], references: [id])
  reportName String
  reportLink String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("medical_reports")
}

//w: (end)  ╰────────────  MedicalReport  ────────────╯

//w: (start)╭────────────  Schedule  ────────────╮
model Schedule {
  id              String            @id @default(uuid())
  startDateTime   DateTime
  endDateTime     DateTime
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  doctorSchedules DoctorSchedules[]
  appointment     Appointment?

  @@unique([startDateTime, endDateTime])
  @@map("schedules")
}

//w: (end)  ╰────────────  Schedule  ────────────╯

//w: (start)╭────────────  DoctorSchedules  ────────────╮
model DoctorSchedules {
  doctorId      String
  doctor        Doctor       @relation(fields: [doctorId], references: [id])
  scheduleId    String
  schedule      Schedule     @relation(fields: [scheduleId], references: [id])
  isBooked      Boolean      @default(false)
  appointmentId String?      @unique
  appointment   Appointment? @relation(fields: [appointmentId], references: [id])

  @@id([doctorId, scheduleId])
  @@map("doctor_schedules")
}

//w: (end)  ╰────────────  DoctorSchedules  ────────────╯

//w: (start)╭──────────── Appointment   ────────────╮
model Appointment {
  id              String            @id @default(uuid())
  patientId       String
  patent          Patient           @relation(fields: [patientId], references: [id])
  doctorId        String
  doctor          Doctor            @relation(fields: [doctorId], references: [id])
  scheduleId      String            @unique
  schedule        Schedule          @relation(fields: [scheduleId], references: [id])
  videoCallingId  String
  status          AppointmentStatus @default(SCHEDULED)
  paymentStatus   PaymentStatus     @default(UNPAID)
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  doctorSchedules DoctorSchedules?
  payment         Payment?
  prescription    Prescription?

  @@map("appointments")
}

//w: (end)  ╰──────────── Appointment   ────────────╯

//w: (start)╭────────────  Payment  ────────────╮
model Payment {
  id                 String        @id @default(uuid())
  appointmentId      String        @unique
  appointment        Appointment   @relation(fields: [appointmentId], references: [id])
  amount             Float
  transactionId      String        @unique
  status             PaymentStatus @default(UNPAID)
  paymentGateWayData Json?
  createdAt          DateTime      @default(now())
  updatedAt          DateTime      @updatedAt

  @@map("payments")
}

//w: (end)  ╰────────────  Payment  ────────────╯

//w: (start)╭────────────  Prescription  ────────────╮
model Prescription {
  id            String      @id @default(uuid())
  appointmentId String      @unique
  appointment   Appointment @relation(fields: [appointmentId], references: [id])
  doctorId      String
  doctor        Doctor      @relation(fields: [doctorId], references: [id])

  @@map("prescriptions")
}

//w: (end)  ╰────────────  Prescription  ────────────╯

enum UserRole {
  SUPER_ADMIN
  ADMIN
  DOCTOR
  PATIENT
}

enum UserStatus {
  ACTIVE
  BLOCKED
  DELETED
}

enum Gender {
  MALE
  FEMALE
}

//w: (start)╭────────────  BloodGroup  ────────────╮
enum BloodGroup {
  A_POSITIVE
  B_POSITIVE
  O_POSITIVE
  AB_POSITIVE
  A_NEGATIVE
  B_NEGATIVE
  O_NEGATIVE
  AB_NEGATIVE
}

//w: (end)  ╰────────────  BloodGroup  ────────────╯

enum MaritalStatus {
  MARRIED
  UNMARRIED
}

//w: (start)╭──────────── AppointmentStatus  ────────────╮
enum AppointmentStatus {
  SCHEDULED
  INPROGRESS
  COMPLETED
  CANCELED
}

//w: (end)  ╰──────────── AppointmentStatus  ────────────╯

//w: (start)╭────────────  PaymentStatus  ────────────╮
enum PaymentStatus {
  PAID
  UNPAID
}

//w: (end)  ╰────────────  PaymentStatus  ────────────╯
```

## 📦 package.json

```json
{
  "name": "cure_sync_backend",
  "type": "module",
  "module": "index.ts",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "node dist/src/server.js",
    "build": "",
    "postinstall": "prisma generate",
    "watch": "tsc --watch"
  },
  "private": true,
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/bun": "latest",
    "@types/cookie-parser": "^1.4.9",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^24.8.1",
    "@types/nodemailer": "^7.0.2",
    "prisma": "^6.17.1",
    "ts-node-dev": "^2.0.0",
    "tsx": "^4.20.6"
  },
  "peerDependencies": {
    "typescript": "^5.9.3"
  },
  "dependencies": {
    "@prisma/client": "^6.17.1",
    "@types/multer": "^2.0.0",
    "axios": "^1.13.2",
    "bcrypt": "^6.0.0",
    "cloudinary": "^2.8.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "date-fns": "^4.1.0",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "http-status": "^2.1.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^2.0.2",
    "nodemailer": "^7.0.9",
    "sslcommerz-lts": "^1.2.0",
    "uuid": "^13.0.0",
    "zod": "^4.1.12"
  }
}
```

## 🧪 payment.api.hurl

```bash
POST {{port6009}}/payments/init/
```

## 🔧 payment.routes.ts

```ts
//
import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

//w: (start)╭──────────── initPayment ────────────╮
router.post("/init/:id", PaymentController.initPayment);
//w: (end)  ╰──────────── initPayment ────────────╯

export const PaymentRoutes = router;
```

## 🎮 payment.controller.ts

```ts
//
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import httpStatus from "http-status";

//w: (start)╭──────────── initPayment ────────────╮
const initPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.initPayment(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initialized successfully",
    data: result,
  });
});
//w: (end)  ╰──────────── initPayment ────────────╯

export const PaymentController = {
  initPayment,
};
```

## 🛠️ payment.service.ts

```ts
//

import axios from "axios";
import config from "../../../config";
import { prisma } from "../../../shared/prisma";

//w: (start)╭──────────── initPayment ────────────╮
const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findUniqueOrThrow({
    where: {
      id: appointmentId,
    },
    include: {
      appointment: {
        include: {
          patent: true,
        },
      },
    },
  });

  const data = {
    store_id: config.ssl.storeId,
    store_passwd: config.ssl.storePass,
    // is_live: false,
    total_amount: paymentData.amount,
    currency: "BDT",
    tran_id: paymentData.transactionId, // use unique tran_id for each api call
    success_url: "http://localhost:3030/success",
    fail_url: config.ssl.successUrl,
    cancel_url: config.ssl.cancelUrl,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "N/A",
    product_name: "Appointment",
    product_category: "Healh Care",
    product_profile: "general",
    cus_name: paymentData.appointment.patent.name,
    cus_email: paymentData.appointment.patent.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "N/A",
    ship_add1: "n/a",
    ship_add2: "n/a",
    ship_city: "n/a",
    ship_state: "n/a",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const response = await axios({
    method: "post",
    url: config.ssl.sslPaymentApi,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(
    response.data,
    "[1;31mresponse in payment.service.ts at line 44[0m",
  );
};
//w: (end)  ╰──────────── initPayment ────────────╯

export const PaymentService = {
  initPayment,
};
```
