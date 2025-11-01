### create schedule

GET {{port6009}}/schedule
Authorization: {{DOCTOR_TOKEN }}



POST {{port6009}}/schedule
Authorization: {{ADMIN_TOKEN }}
Content-Type: application/json

{
  "startDate": "2025-11-01",
  "endDate": "2025-11-03",
  "startTime": "09:00",
  "endTime": "17:00"
}

