```bash
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app/module/User
├── userApi.hurl
├── user.constant.ts
├── user.controller.ts
├── user.interface.ts
├── user.routes.ts
├── user.service.ts
└── user.validation.ts

1 directory, 10 files
```

## 📄 Module Files & Contents

### `user.controller.ts`

````ts
//
import { Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";

//w: (start)╭──────────── createAdmin ────────────╮
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdminIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});
//w: (end) ╰──────────── createAdmin ────────────╯

//w: (start)╭──────────── getAllUsers ────────────╮
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);

  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await UserService.getAllUsersFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllUsers ────────────╯

//w: (start)╭──────────── createDoctor  ────────────╮
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctorIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});
//w: (end) ╰──────────── createDoctor  ────────────╯

//w: (start)╭──────────── createPatient  ────────────╮
const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatientIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});
//w: (end) ╰──────────── createPatient  ────────────╯

//w: (start)╭──────────── changeProfileStatus  ────────────╮
const changeProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile status changed successfully",
    data: result,
  });
});
//w: (end) ╰──────────── changeProfileStatus  ────────────╯

//w: (start)╭──────────── getMyProfile  ────────────╮
const getMyProfile = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res,
  ) => {
    const user = req.user;
    const result = await UserService.getMyProfileFromDB(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched successfully",
      data: result,
    });
  },
);
//w: (end) ╰──────────── getMyProfile  ────────────╯
export const UserController = {
  createAdmin,
  getAllUsers,
  createDoctor,
  createPatient,
  changeProfileStatus,
  getMyProfile,
};
### `user.routes.ts`

```ts
//
import express, { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
const router: Router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.getAllUsers,
);

router.get("/me", auth(), UserController.getMyProfile);

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createAdmin(req, res, next);
  },
);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`body data from controller`, JSON.parse(req.body.data));
    req.body = userValidation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createDoctor(req, res, next);
  },
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createPatient(req, res, next);
  },
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userValidation.changeProfileStatusValidationSchema),
  UserController.changeProfileStatus,
);

export const UserRoutes: Router = router;
````

### `user.validation.ts`

```ts
//
import { Gender, UserRole, UserStatus } from "@prisma/client";
import z from "zod";

const createAdminValidationSchema = z
  .object({
    password: z.string(),
    admin: z.object({
      name: z.string({}),
      email: z.string(),
      contactNumber: z.string(),
    }),
  })
  .strict();

const createDoctorValidationSchema = z
  .object({
    password: z.string({ message: "Password is required" }),
    doctor: z.object({
      name: z.string({ message: "Doctor name is required" }),
      email: z.string({ message: "Email is required" }),
      contactNumber: z.string({ message: "Contact number is required" }),
      address: z.string().optional(),
      registrationNumber: z.string({
        message: "Registration number is required",
      }),
      experience: z.number().optional(),
      gender: z.enum([Gender.MALE, Gender.FEMALE], {
        message: "Gender is required",
      }),
      appointmentFee: z
        .number({ message: "Appointment fee is required" })
        .positive("Appointment fee must be positive"),
      qualification: z.string({ message: "Qualification is required" }),
      currentWorkingPlace: z.string({
        message: "Current working place is required",
      }),
      designation: z.string({ message: "Designation is required" }),
    }),
  })
  .strict();

const createPatientValidationSchema = z
  .object({
    password: z.string({
      message: "Password is required",
    }),
    patient: z.object({
      name: z.string({ message: "Patient name is required" }),
      email: z.string({ message: "Email is required" }),
      contactNumber: z.string({
        message: "Contact number is required",
      }),
      address: z.string().optional(),
      gender: z.enum([Gender.MALE, Gender.FEMALE]),
    }),
  })
  .strict();

const changeProfileStatusValidationSchema = z.object({
  body: z
    .object({
      status: z.enum([
        UserStatus.ACTIVE,
        UserStatus.BLOCKED,
        UserStatus.DELETED,
      ]),
    })
    .strict(),
});

export const userValidation = {
  createAdminValidationSchema,
  createDoctorValidationSchema,
  createPatientValidationSchema,
  changeProfileStatusValidationSchema,
};
```

### `userApi.hurl`

```hurl
GET {{port6009 }}/user

POST {{port6009 }}/user
Authorization: {{token}}
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "jamal@cure.sync",
    "name": "jamal",
    "contactNumber": "932476"
  }
}



POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "jamal@cure.sync",
    "name": "Jamal",
    "contactNumber": "932476"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "rahim.cure@sync.io",
    "name": "Rahim",
    "contactNumber": "984512"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "karim_admin@curesync.app",
    "name": "Karim",
    "contactNumber": "947230"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "nabila.dev@cure-sync.org",
    "name": "Nabila",
    "contactNumber": "903458"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "tariq.sync.care@gmail.com",
    "name": "Tariq",
    "contactNumber": "912640"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "sumaiya@health.cure.sync",
    "name": "Sumaiya",
    "contactNumber": "938471"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "asif_cure@medsync.net",
    "name": "Asif",
    "contactNumber": "972364"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "lima.care.sync@outlook.com",
    "name": "Lima",
    "contactNumber": "945613"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "raihan+admin@cure.sync.io",
    "name": "Raihan",
    "contactNumber": "993752"
  }
}

POST {{port6009}}/user
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "maliha-admin@sync.health",
    "name": "Maliha",
    "contactNumber": "902384"
  }
}


POST {{port6009}}/user
id: 5051362b-3b51-4cd0-9b6f-669cc437e9b4
Content-Type: application/json
{
  "password": "123456",
  "admin": {
    "email": "karim-admin@sync.health",
    "name": "Maliha",
    "contactNumber": "902384"
  }
}
```

### `user.service.ts`

```ts
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

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
//

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
//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const UserService = {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
  getAllUsersFromDB,
  changeProfileStatus,
  getMyProfileFromDB,
};
```

### `user2Api.hurl`

```hurl
GET {{ port6009 }}/user
Authorization: Bearer {{ token }}


PATCH {{ port6009 }}/user/5f6b8c9c-b2a9-4f4c-a8a1-f2d6a4a2c2f1/status
Content-Type: application/json
Authorization: Bearer {{ token }}

{
  "status": "ADMIN"
}
```

### `user.constant.ts`

```ts
//

export const userSearchableFields = ["email"];

export const userFilterableFields = ["email", "role", "status", "searchTerm"];
```

### `user.interface.ts`

```ts
//

type IUserFilterRequest = {
  searchTerm?: string;
  role?: string;
  status?: string;
};
```
