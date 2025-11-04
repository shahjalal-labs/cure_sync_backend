## 🌲 Full Project Structure (cwd)

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
│   │   │   │   ├── doctorSchedule.controller.ts
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
│   │   │   │   ├── patient.validation.ts
│   │   │   │   └── refractorPatientPrompt.md
│   │   │   ├── Schedule
│   │   │   │   ├── schedule.api.hurl
│   │   │   │   ├── schedule.constant.ts
│   │   │   │   ├── schedule.controller.ts
│   │   │   │   ├── schedule.interface.ts
│   │   │   │   ├── schedule.routes.ts
│   │   │   │   ├── schedule.service.ts
│   │   │   │   └── schedule.validation.ts
│   │   │   ├── Specialities
│   │   │   │   ├── specialites.controller.ts
│   │   │   │   ├── specialites.routes.ts
│   │   │   │   ├── specialites.validation.ts
│   │   │   │   ├── specialitiesApi.hurl
│   │   │   │   └── specialities.service.ts
│   │   │   └── User
│   │   │       ├── bulkPatientData.json
│   │   │       ├── doctorData.json
│   │   │       ├── patientData.json
│   │   │       ├── refractorUserPrompt.md
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

37 directories, 131 files
```

## 📁 Target Module Tree (Specialities)

```bash
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app/module/Specialities
├── specialites.controller.ts
├── specialites.routes.ts
├── specialites.validation.ts
├── specialitiesApi.hurl
└── specialities.service.ts

1 directory, 5 files
```

## 📄 Module Files & Contents

### `specialites.validation.ts`

```ts
//
import z from "zod";

const createSpecialitiesValidationSchema = z.object({
  title: z.enum([
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "General Surgery",
    "Hematology",
    "Internal Medicine",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology (ENT)",
    "Pediatrics",
    "Plastic Surgery",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Urology",
    "Anesthesiology",
    "Emergency Medicine",
    "Family Medicine",
    "Geriatrics",
    "Infectious Disease",
    "Pathology",
    "Physical Medicine and Rehabilitation",
    "Sports Medicine",
    "Allergy and Immunology",
  ]),
});

export const SpecialitiesValidation = {
  createSpecialitiesValidationSchema,
};
```

### `specialites.controller.ts`

```ts
//
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { SpecialitiesService } from "./specialities.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";

//w: (start)╭──────────── createSpecialities  ────────────╮
const createSpecialities = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialitiesService.createSpecialitiesIntoDB(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialities created successfully!",
    data: result,
  });
});
//w: (end) ╰──────────── createSpecialities  ────────────╯

//w: (start)╭──────────── getAllSpecialities ────────────╮
const getAllSpecialities = catchAsync(async (req, res) => {
  const result = await SpecialitiesService.getAllSpecialitiesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialities fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllSpecialities ────────────╯

//w: (start)╭──────────── deleteSpecialities────────────╮
const deleteSpecialities = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialitiesService.deleteSpecialitiesFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialities deleted successfully",
    data: result,
  });
});
//w: (end) ╰──────────── deleteSpecialities────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

export const SpecialitiesController = {
  createSpecialities,
  getAllSpecialities,
  deleteSpecialities,
};
```

### `specialites.routes.ts`

```ts
//
import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { SpecialitiesValidation } from "./specialites.validation";
import { SpecialitiesController } from "./specialites.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

//w: (start)╭──────────── createSpecialities ────────────╮
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialitiesValidation.createSpecialitiesValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return SpecialitiesController.createSpecialities(req, res, next);
  },
);
//w: (end) ╰──────────── createSpecialities ────────────╯

router.get("/", SpecialitiesController.getAllSpecialities);

//w: (start)╭──────────── deleteSpecialities ────────────╮
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SpecialitiesController.deleteSpecialities,
);
//w: (end) ╰──────────── deleteSpecialities ────────────╯

export const SpecialitiesRoutes = router;
```

### `specialitiesApi.hurl`

```hurl
GET {{port6009 }}/specialities


POST {{port6009 }}/specialities
Authorization: {{token}}
Content-Type: application/json
{
 "title": "Hematology"
}



DELETE {{port6009 }}/specialities/926ca006-8df9-4c6a-aa4a-7e55dffc6f1c
Authorization: {{token}}
```

### `specialities.service.ts`

```ts
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
  await prisma.specialities.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.specialities.delete({
    where: {
      id,
    },
  });
  return result;
};
//w: (end) ╰──────────── deleteSpecialitiesFromDB  ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯

export const SpecialitiesService = {
  createSpecialitiesIntoDB,
  getAllSpecialitiesFromDB,
  deleteSpecialitiesFromDB,
};
```
