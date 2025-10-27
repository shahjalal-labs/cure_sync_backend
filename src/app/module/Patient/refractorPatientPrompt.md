```bash
/home/sj/web/ph/cure_sync/cure_sync_backend/src/app/module/Patient
├── patienst.routes.ts
├── patientApi.hurl
├── patient.constant.ts
├── patient.controller.ts
├── patientData.json
├── patient.interface.ts
└── patient.service.ts

1 directory, 7 files
```

## 📄 Module Files & Contents

### `patientApi.hurl`

```hurl
GET {{port6009}}/patients


GET {{port6009}}/patients?searchTerm=sa&page=1&limit=15&sortBy=name&sortOrder=asc&name=javed%20hossain


GET {{port6009}}/patients/32b007bc-a209-4801-a4fd-0e0a12eeccbf

```

### `patientData.json`

```javascripton
[
  {
    "password": "123456",
    "patient": {
      "name": "Rafiul Hasan",
      "email": "rafiul.hasan@outlook.com",
      "contactNumber": "+8801712345701",
      "address": "Bashundhara R/A, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Nusrat Jahan",
      "email": "nusrat.jahan@gmail.com",
      "contactNumber": "+8801612345702",
      "address": "Sholokbahar, Chattogram"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Sabbir Ahmed",
      "email": "sabbir.ahmed@proton.me",
      "contactNumber": "+8801812345703",
      "address": "Mirpur-10, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Mitu Akhter",
      "email": "mitu.akhter@icloud.com",
      "contactNumber": "+8801512345704",
      "address": "Sonadanga, Khulna"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Tariqul Islam",
      "email": "tariqul.islam@mail.com",
      "contactNumber": "+8801719876705",
      "address": "Agrabad, Chattogram"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Sharmin Nahar",
      "email": "sharmin.nahar@live.com",
      "contactNumber": "+8801911123344",
      "address": "Motijheel, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Rashidul Karim",
      "email": "rashidul.karim77@yahoo.com",
      "contactNumber": "+8801301234706",
      "address": "Ambarkhana, Sylhet"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Tahmina Chowdhury",
      "email": "tahmina.chowdhury@bdmail.net",
      "contactNumber": "+8801407654707",
      "address": "Mohammadpur, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Javed Hossain",
      "email": "javed.hossain@gmail.com",
      "contactNumber": "+8801755556788",
      "address": "Rajshahi City Center"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Rafiul Hasan",
      "email": "rafiul.hasan@outlook.com",
      "contactNumber": "+8801712345701",
      "address": "Bashundhara R/A, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Nusrat Jahan",
      "email": "nusrat.jahan@gmail.com",
      "contactNumber": "+8801612345702",
      "address": "Sholokbahar, Chattogram"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Sabbir Ahmed",
      "email": "sabbir.ahmed@proton.me",
      "contactNumber": "+8801812345703",
      "address": "Mirpur-10, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Mitu Akhter",
      "email": "mitu.akhter@icloud.com",
      "contactNumber": "+8801512345704",
      "address": "Sonadanga, Khulna"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Tariqul Islam",
      "email": "tariqul.islam@mail.com",
      "contactNumber": "+8801719876705",
      "address": "Agrabad, Chattogram"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Sharmin Nahar",
      "email": "sharmin.nahar@live.com",
      "contactNumber": "+8801911123344",
      "address": "Motijheel, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Rashidul Karim",
      "email": "rashidul.karim77@yahoo.com",
      "contactNumber": "+8801301234706",
      "address": "Ambarkhana, Sylhet"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Tahmina Chowdhury",
      "email": "tahmina.chowdhury@bdmail.net",
      "contactNumber": "+8801407654707",
      "address": "Mohammadpur, Dhaka"
    }
  },
  {
    "password": "123456",
    "patient": {
      "name": "Javed Hossain",
      "email": "javed.hossain@gmail.com",
      "contactNumber": "+8801755556788",
      "address": "Rajshahi City Center"
    }
  }
]
```

### `patient.controller.ts`

```ts
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { PatientService } from "./patient.service";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";
import { patientFilterableFields } from "./patient.constant";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields);

  const options = pick(req.query, ["page", "limit", "sortOrder", "sortBy"]);
  const result = await PatientService.getAllPatient(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All patient fetched successfully",
    data: result,
  });
});
//w: (end) ╰──────────── getAllPatient  ────────────╯

//w: (start)╭──────────── getPatientById ────────────╮
const getPatientById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PatientService.getPatientById(id);
  console.log(result, "[1;31mresult in patient.controller.ts at line 31[0m");
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient fetched successfully.",
    data: result,
  });
});

//w: (end) ╰──────────── getPatientById ────────────╯

//w: (start)╭────────────  ────────────╮

//w: (end) ╰────────────  ────────────╯
export const PatientController = {
  getAllPatient,
  getPatientById,
};
```

### `patient.constant.ts`

```ts
//
export const patientSearchableFields = ["name", "email", "contactNumber"];

export const patientFilterableFields = [
  "name",
  "email",
  "contactNumber",
  "searchTerm",
];
```

### `patient.interface.ts`

```ts
//
export type IPatientFilterRequest = {
  searchTerm?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
};
```

### `patient.service.ts`

```ts
//

import { Patient, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginatonHelper";
import { prisma } from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IPatientFilterRequest } from "./patient.interface";
import { patientSearchableFields } from "./patient.constant";

//w: (start)╭──────────── getAllPatient  ────────────╮
const getAllPatient = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelper.calcalutePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    console.log(
      searchTerm,
      "[1;31msearchTerm in patient.service.ts at line 22[0m",
    );
    andConditions.push({
      OR: patientSearchableFields.map((f) => ({
        [f]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map((f) => ({
        [f]: {
          equals: (filterData as any)[f],
          mode: "insensitive",
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput = andConditions.length
    ? {
        AND: andConditions,
      }
    : {};

  const result = await prisma.patient.findMany({
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
  });

  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
//w: (end) ╰──────────── getAllPatient  ────────────╯

//w: (start)╭──────────── getPatientById ────────────╮
const getPatientById = async (id: string): Promise<Patient | null> => {
  console.log(id, "[1;31mid in patient.service.ts at line 88[0m");
  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: true,
    },
  });
  return "data";
};
//w: (end) ╰──────────── getPatientById ────────────╯

export const PatientService = {
  getAllPatient,
  getPatientById,
};
```

### `patienst.routes.ts`

```ts
//
import express from "express";
import { PatientController } from "./patient.controller";

const router = express.Router();

router.get("/", PatientController.getAllPatient);

router.get("/:id", PatientController.getPatientById);

export const PatientRoutes = router;
```
