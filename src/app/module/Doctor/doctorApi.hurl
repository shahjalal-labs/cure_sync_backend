
GET {{port6009 }}/doctors

GET {{port6009 }}/doctors/d9b5791c-2da9-46b3-a47a-cc25a1bb4dc2

DELETE {{port6009}}/doctors/soft/20c34838-07ca-4246-9623-1f3d0c774248
Authorization: {{token}}

DELETE {{port6009}}/doctors/20c34838-07ca-4246-9623-1f3d0c774248
Authorization: {{token}}

PATCH {{port6009}}/doctors/d9b5791c-2da9-46b3-a47a-cc25a1bb4dc2
Authorization: {{token}}
Content-Type: application/json

{
  "name": "Dr. Nusrat Jahan",
    "specialities": [
    { "specialitiesId": "7d07e1ae-df45-4d10-9213-d96ad745d182", "isDeleted": false },
    { "specialitiesId": "9c528ef5-f616-41ee-8df1-5962ba5e49aa", "isDeleted": false },
    { "specialitiesId": "ad65e927-4565-4a38-9a40-566186778d87", "isDeleted": true }
  ]
}

