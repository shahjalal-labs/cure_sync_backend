
POST {{port6009}}/doctor-schedule
Authorization: {{DOCTOR_TOKEN }}

Content-Type: application/json

{
  "scheduleIds": [
    "0774e718-09e0-4e99-a5f1-1c4c2f819b6f",
    "0ab47b6a-fdd6-4e9a-8c3b-86dc79e6a1c3",
    "0b21caf3-35c2-49bd-8891-ab096e3a4547",
    "0beee3d9-f716-4567-8791-aa20c767dfbe",
    "0d4e28fa-06d3-4564-a0d8-ccba09093213",
    "0e4978cc-92bb-4b83-a39f-a1925e3be6bb",
    "189ffe85-4410-484f-9c07-dc40ef1186d6",
    "1afa6d64-a702-4db9-ac44-214de0bbbd6a",
    "1eaa98f6-0e20-43d7-bdd6-9423e3d76e41",
    "40d767a0-602d-4521-b247-b2c445f59682"
  ]
}



GET {{port6009}}/doctor-schedule

GET {{port6009}}/doctor-schedule/my-schedules
Authorization: {{DOCTOR_TOKEN}}





GET {{port6009}}/doctor-schedule/my-schedules?startDate=2025-11-05T04:00:00.000Z&endDate=2025-11-05T05:00:00.000Z
Authorization: {{DOCTOR_TOKEN}}

Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhaWxhLnN1bHRhbmFAbWFpbC5jb20iLCJyb2xlIjoiRE9DVE9SIiwiaWF0IjoxNzYyNTM2MzE5LCJleHAiOjE3NjUxMjgzMTl9.pTq5dGY20IB2dmQR3A6WFePyTLW4vHfmUVIZNfWqMtM


# delete doctor schedule
DELETE {{port6009}}/doctor-schedule/2e603bd2-7c35-4bb9-9930-bb0aca536b71
Authorization: {{DOCTOR_TOKEN }}
