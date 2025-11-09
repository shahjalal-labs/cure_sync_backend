GET  {{port6009}}/appointment


# create appointment

POST  {{port6009}}/appointment
Authorization: {{PATIENT_TOKEN}}

Content-Type: application/json

{
  "doctorId": "8770261a-71e8-45e2-9c3f-b453d947b79e",
  "scheduleId": "065de160-b017-4fcf-9759-a3c98ea608c8"
}
