
# login user

POST {{port6009}}/auth
Content-Type: application/json
{
  "email": "jamal@cure.sync",
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
