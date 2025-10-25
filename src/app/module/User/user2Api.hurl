GET {{ port6009 }}/user
Authorization: Bearer {{ token }}


PATCH {{ port6009 }}/user/5f6b8c9c-b2a9-4f4c-a8a1-f2d6a4a2c2f1/status
Content-Type: application/json
Authorization: Bearer {{ token }}

{
  "status": "ADMIN"
}


PATCH {{ port6009 }}/user/me/update

Authorization: {{ token }}

Content-Type: application/json

{
  "name": "test",
  "contactNumber": "123456789"
}
