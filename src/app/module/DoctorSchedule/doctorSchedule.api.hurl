
POST {{port6009}}/doctor-schedule
Authorization: {{DOCTOR_TOKEN }}

Content-Type: application/json

{
  "scheduleIds": [
      "f5293923-9c06-4921-a1b6-24dc377d3b66",
      "82dce632-68fb-4ae9-bddf-f8f19c63f9ac",
      "5253dc42-8a49-4194-a3d6-53a5a2aac604",
      "065de160-b017-4fcf-9759-a3c98ea608c8",
      "e5495530-8d5e-45ad-b0b3-ac165f70fe5a",
      "fe5203ea-55cb-4d74-a745-084bef924105",
      "fb4f3e1d-acf9-46ce-87b7-99df3cde2783"
  ]
}



GET {{port6009}}/doctor-schedule

GET {{port6009}}/doctor-schedule/my-schedules
Authorization: {{DOCTOR_TOKEN}}





GET {{port6009}}/doctor-schedule/my-schedules?startDate=2025-11-05T04:00:00.000Z&endDate=2025-11-05T05:00:00.000Z
Authorization: {{DOCTOR_TOKEN}}

Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhaWxhLnN1bHRhbmFAbWFpbC5jb20iLCJyb2xlIjoiRE9DVE9SIiwiaWF0IjoxNzYyNTM2MzE5LCJleHAiOjE3NjUxMjgzMTl9.pTq5dGY20IB2dmQR3A6WFePyTLW4vHfmUVIZNfWqMtM


# delete doctor schedule
DELETE {{port6009}}/doctor-schedule/0774e718-09e0-4e99-a5f1-1c4c2f819b6f
Authorization: {{DOCTOR_TOKEN }}
