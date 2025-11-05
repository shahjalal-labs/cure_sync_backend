
GET {{port6010}}/schedule?startDate=2025-11-04&endDate=2025-11-05
Authorization: {{DOCTOR_TOKEN }}



### create schedule
POST {{port6009}}/schedule
Authorization: {{ADMIN_TOKEN }}
Content-Type: application/json

{
  "startDate": "2025-11-04",
  "endDate": "2025-11-05",
  "startTime": "09:00",
  "endTime": "17:00"
}

