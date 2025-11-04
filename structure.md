# 📁 Project Structure

```bash
.
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

37 directories, 129 files

```
