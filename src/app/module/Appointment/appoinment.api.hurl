GET  {{port6009}}/appointment


# create appointment
POST  {{port6009}}/appointment
Authorization: {{token}}

Content-Type: application/json

{
  "doctorId": "{{doctorId}}",
  "scheduleId": "{{scheduleId}}"
}
