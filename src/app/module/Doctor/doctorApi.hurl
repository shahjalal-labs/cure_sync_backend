
GET {{port6009 }}/doctors

GET {{port6009 }}/doctors/d9b5791c-2da9-46b3-a47a-cc25a1bb4dc2

DELETE {{port6009}}/doctors/soft/20c34838-07ca-4246-9623-1f3d0c774248
Authorization: {{token}}

DELETE {{port6009}}/doctors/20c34838-07ca-4246-9623-1f3d0c774248
Authorization: {{token}}



PATCH {{port6009}}/doctors/8f6e5a3a-4b03-4de3-90af-cee93cb7a82b
Authorization: {{token}}
Content-Type: application/json

{
  "name": "Dr. Rajib Hasan",
  "contactNumber": "+8801712345005",
  "address": "Kakrail, Dhaka",
  "registrationNumber": "BMDC-210005",
  "experience": 10,
  "gender": "MALE",
  "appointmentFee": 800,
  "qualification": "MBBS, FCPS (Medicine)",
  "currentWorkingPlace": "Popular Diagnostic Centre",
  "designation": "Medicine Specialist",
  "specialities": [
    { "specialitiesId": "58439d2d-96f8-4899-a74b-ec3601b7b08d", "isDeleted": false },
    { "specialitiesId": "cc192d6e-5318-4dd5-ab60-15643b7d9da5", "isDeleted": false }
  ]
}

