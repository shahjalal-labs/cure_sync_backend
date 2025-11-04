## 📁 Target Module Tree (User)

```bash
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app/module/User
├── doctorData.json
├── patientData.json
├── user2Api.hurl
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

### `patientData.json`

```javascripton

```

### `user.controller.ts`

```ts
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

//w: (start)╭──────────── updateMyProfile  ────────────╮
const updateMyProfile = catchAsync(
  async (
    req: Request & {
      user?: IAuthUser;
    },
    res,
  ) => {
    const user = req.user;
    const result = await UserService.updateMyProfile(user as IAuthUser, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  },
);
//w: (end) ╰──────────── updateMyProfile  ────────────╯

//w: (start)╭──────────── updateMyProfile  ────────────╮

//w: (end) ╰──────────── updateMyProfile  ────────────╯

export const UserController = {
  createAdmin,
  getAllUsers,
  createDoctor,
  createPatient,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
```

### `doctorData.json`

```javascripton
[
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Arif Hossain",
      "email": "arif.hossain@doctor.com",
      "contactNumber": "+8801712345678",
      "address": "House 12, Road 4, Dhanmondi, Dhaka",
      "registrationNumber": "BMDC-210045",
      "experience": 12,
      "gender": "MALE",
      "appointmentFee": 800,
      "qualification": "MBBS, FCPS (Medicine)",
      "currentWorkingPlace": "Dhaka Medical College Hospital",
      "designation": "Consultant Physician"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Nusrat Jahan",
      "email": "nusrat.jahan92@yahoo.com",
      "contactNumber": "+8801912345670",
      "address": "House 34, Sector 7, Uttara, Dhaka",
      "registrationNumber": "BMDC-200998",
      "experience": 8,
      "gender": "FEMALE",
      "appointmentFee": 600,
      "qualification": "MBBS, MD (Paediatrics)",
      "currentWorkingPlace": "United Hospital, Dhaka",
      "designation": "Pediatrician"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Mahfuzur Rahman",
      "email": "mahfuz.rahman@outlook.com",
      "contactNumber": "+8801612345671",
      "address": "Road 2, Gulshan-1, Dhaka",
      "registrationNumber": "BMDC-190123",
      "experience": 18,
      "gender": "MALE",
      "appointmentFee": 1500,
      "qualification": "MBBS, MS (General Surgery)",
      "currentWorkingPlace": "Square Hospital, Dhaka",
      "designation": "Senior Consultant Surgeon"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Farhana Begum",
      "email": "farhana_begum@icloud.com",
      "contactNumber": "+8801812345672",
      "address": "Flat 7A, Banani, Dhaka",
      "registrationNumber": "BMDC-220331",
      "experience": 6,
      "gender": "FEMALE",
      "appointmentFee": 700,
      "qualification": "MBBS, DGO",
      "currentWorkingPlace": "Ibn Sina Hospital, Dhaka",
      "designation": "Obstetrician & Gynecologist"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Kamal Ahmed",
      "email": "kamal.ahmed83@protonmail.com",
      "contactNumber": "+8801512345673",
      "address": "College Road, Chattogram",
      "registrationNumber": "BMDC-180876",
      "experience": 20,
      "gender": "MALE",
      "appointmentFee": 1000,
      "qualification": "MBBS, MD (Cardiology)",
      "currentWorkingPlace": "Chattogram Medical College Hospital",
      "designation": "Cardiologist"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Laila Sultana",
      "email": "laila.sultana@mail.com",
      "contactNumber": "+8801719876543",
      "address": "Khatunganj, Chattogram",
      "registrationNumber": "BMDC-160207",
      "experience": 14,
      "gender": "FEMALE",
      "appointmentFee": 900,
      "qualification": "MBBS, FCPS (Obs & Gynae)",
      "currentWorkingPlace": "Chattogram General Hospital",
      "designation": "Senior Consultant"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Selim Khan",
      "email": "skhan77@hotmail.com",
      "contactNumber": "+8801911122233",
      "address": "Kakrail, Dhaka",
      "registrationNumber": "BMDC-230412",
      "experience": 4,
      "gender": "MALE",
      "appointmentFee": 500,
      "qualification": "MBBS",
      "currentWorkingPlace": "Popular Diagnostic Centre, Dhaka",
      "designation": "General Practitioner"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Tanjila Rahman",
      "email": "tanjila.rahman@live.com",
      "contactNumber": "+8801301234567",
      "address": "Kazir Dewri, Chattogram",
      "registrationNumber": "BMDC-200765",
      "experience": 9,
      "gender": "FEMALE",
      "appointmentFee": 650,
      "qualification": "MBBS, MD (Dermatology)",
      "currentWorkingPlace": "Chevron Clinical Lab, Chattogram",
      "designation": "Dermatologist"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Ahsan Kabir",
      "email": "ahsan_kabir.bd@bdmail.net",
      "contactNumber": "+8801407654321",
      "address": "Zindabazar, Sylhet",
      "registrationNumber": "BMDC-170512",
      "experience": 15,
      "gender": "MALE",
      "appointmentFee": 900,
      "qualification": "MBBS, MS (Orthopedics)",
      "currentWorkingPlace": "Sylhet MAG Osmani Medical College",
      "designation": "Orthopedic Surgeon"
    }
  },
  {
    "password": "123456",
    "doctor": {
      "name": "Dr. Rubina Akter",
      "email": "rubina.akter72@yahoo.com",
      "contactNumber": "+8801755556677",
      "address": "Nirala, Khulna",
      "registrationNumber": "BMDC-210901",
      "experience": 10,
      "gender": "FEMALE",
      "appointmentFee": 750,
      "qualification": "MBBS, FCPS (ENT)",
      "currentWorkingPlace": "Khulna Medical College Hospital",
      "designation": "ENT Specialist"
    }
  }
]
```

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

//w: (start)╭──────────── createAdmin ────────────╮
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
//w: (end) ╰──────────── createAdmin ────────────╯

//w: (start)╭──────────── createDoctor ────────────╮
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
//w: (end) ╰──────────── createDoctor ────────────╯

//w: (start)╭──────────── createPatient ────────────╮
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
//w: (end) ╰──────────── createPatient ────────────╯

//w: (start)╭──────────── changeProfileStatus ────────────╮
router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(userValidation.changeProfileStatusValidationSchema),
  UserController.changeProfileStatus,
);
//w: (end) ╰──────────── changeProfileStatus ────────────╯

//w: (start)╭──────────── updateMyProfile  ────────────╮
router.patch(
  "/me/update",
  auth(),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.updateMyProfileValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    return UserController.updateMyProfile(req, res, next);
  },
);
//w: (end) ╰──────────── updateMyProfile  ────────────╯

export const UserRoutes: Router = router;
```

### `user.validation.ts`

```ts
//
import { Gender, UserRole, UserStatus } from "@prisma/client";
import z from "zod";

//w: (start)╭──────────── createAdminValidationSchema  ────────────╮
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
//w: (end) ╰──────────── createAdminValidationSchema  ────────────╯

//w: (start)╭──────────── createDoctorValidationSchema  ────────────╮
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
//w: (end) ╰────────────  createDoctorValidationSchema ────────────╯

//w: (start)╭──────────── createPatientValidationSchema  ────────────╮
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
      // gender: z.enum([Gender.MALE, Gender.FEMALE]),
    }),
  })
  .strict();
//w: (end) ╰──────────── createPatientValidationSchema  ────────────╯

//w: (start)╭──────────── changeProfileStatusValidationSchema  ────────────╮
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
//w: (end) ╰──────────── changeProfileStatusValidationSchema  ────────────╯

//w: (start)╭──────────── updateMyProfile  ────────────╮
const updateMyProfileValidationSchema = z
  .object({
    name: z.string().min(2).max(50),
    contactNumber: z.string().min(4).max(15),
  })
  .partial()
  .strict();
//w: (end) ╰──────────── updateMyProfile  ────────────╯

export type TUpdateMyProfile = z.infer<typeof updateMyProfileValidationSchema>;

export const userValidation = {
  createAdminValidationSchema,
  createDoctorValidationSchema,
  createPatientValidationSchema,
  changeProfileStatusValidationSchema,
  updateMyProfileValidationSchema,
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


PATCH {{ port6009 }}/user/me/update

Authorization: {{ token }}

Content-Type: application/form-data

{
  "name": "test",
  "contactNumber": "123456789"
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
