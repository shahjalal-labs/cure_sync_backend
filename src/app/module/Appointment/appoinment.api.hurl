GET  {{port6009}}/appointment
Authorization: {{DOCTOR_TOKEN}}


# create appointment

POST  {{port6009}}/appointment
Authorization: {{PATIENT_TOKEN}}

Content-Type: application/json
{
  "doctorId": "8770261a-71e8-45e2-9c3f-b453d947b79e",
  "scheduleId": "5253dc42-8a49-4194-a3d6-53a5a2aac604"
}



PATCH  {{port6009}}/appointment/status/8770261a-71e8-45e2-9c3f-b453d947b79e
Authorization: {{DOCTOR_TOKEN }}

Content-Type: application/json
{
  "status": "INPROGRESS"
}


GET  {{port6009}}/appointment?status=SCHEDULED&paymentStatus=UNPAID
Authorization: {{PATIENT_TOKEN}}


GET  {{port6009}}/appointment
Authorization: {{DOCTOR_TOKEN}}
