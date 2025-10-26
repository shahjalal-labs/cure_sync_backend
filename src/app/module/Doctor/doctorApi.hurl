
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
    { "specialitiesId": "550e8400-e29b-41d4-a716-446655440000", "isDeleted": false },
    { "specialitiesId": "550e8400-e29b-41d4-a716-446655440001", "isDeleted": false },
    { "specialitiesId": "550e8400-e29b-41d4-a716-446655440002", "isDeleted": false }
  ]
}

