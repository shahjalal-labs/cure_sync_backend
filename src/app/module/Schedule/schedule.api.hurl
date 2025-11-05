
GET {{port6009}}/schedule
Authorization: {{DOCTOR_TOKEN }}


GET {{port6009}}/schedule?startDate=2025-11-04T06:30:00.000Z&endDate=2025-11-05T06:00:00.000Z
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

