GET  {{port6009}}/appointment
Authorization: {{DOCTOR_TOKEN}}


# create appointment

POST  {{port6009}}/appointment
Authorization: {{PATIENT_TOKEN}}

Content-Type: application/json
{
 "doctorId": "8770261a-71e8-45e2-9c3f-b453d947b79e",
 "scheduleId": "82dce632-68fb-4ae9-bddf-f8f19c63f9ac"
}
        "doctorId": "8770261a-71e8-45e2-9c3f-b453d947b79e",
        "scheduleId": "e5495530-8d5e-45ad-b0b3-ac165f70fe5a",





PATCH  {{port6009}}/appointment/status/0332b66c-239d-47a6-b8a3-d27eb91b9bad
Authorization: {{DOCTOR_TOKEN }}

Content-Type: application/json
{
  "status": "INPROGRESS"
}


GET  {{port6009}}/appointment?status=SCHEDULED&paymentStatus=UNPAID
Authorization: {{PATIENT_TOKEN}}


GET  {{port6009}}/appointment
Authorization: {{DOCTOR_TOKEN}}
