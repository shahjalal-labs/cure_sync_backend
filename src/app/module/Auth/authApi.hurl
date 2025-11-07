
# login user

POST {{port6009}}/auth
Content-Type: application/json
{
  "email": "arif.hossain@doctor.com",
  "password": "123456"
}


POST  {{port6009}}/auth/refresh-token

POST {{port6009}}/auth/change-password
Authorization: {{token}}

Content-Type: application/json
{
  "oldPassword": "123456",
  "newPassword": "123456"
}


POST {{port6009}}/auth/forgot-password
Authorization: {{token}}

Content-Type: application/json
{
  "email": "shahjalal.backend@gmail.com"
}

POST {{port6009}}/auth/reset-password
juthorization: {{token}}

Content-Type: application/json
{
  "id": "137296a7-aae3-4ad2-bad6-fd9cde86ef7a",
  "newPassword": "newPassword"
}
