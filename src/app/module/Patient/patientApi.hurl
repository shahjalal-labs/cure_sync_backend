GET {{port6009}}/patients


GET {{port6009}}/patients?searchTerm=sa&page=1&limit=15&sortBy=name&sortOrder=asc&name=javed%20hossain


GET {{port6009}}/patients/93f32bcb-a1eb-4462-b682-f60317951e93


DELETE  {{port6009}}/patients/soft/93f32bcb-a1eb-4462-b682-f60317951e93


DELETE  {{port6009}}/patients/soft/93f32bcb-a1eb-4462-b682-f60317951e93




PATCH {{port6009}}/patients/11eb7e51-14ca-4478-b1a6-17637fca5218
Content-Type: application/json



{
  "name": "Farhana Yeasmin",
  "contactNumber": "+8801712346008",
  "address": "Shyamoli, Dhaka",
  "patientHealthData": {
    "gender": "FEMALE",
    "dateOfBirth": "1995-07-18",
    "bloodGroup": "AB_POSITIVE",
    "hasAllergies": true,
    "hasDiabetes": false,
    "height": "158",
    "weight": "54"
  },
  "medicalReport": {
    "reportName": "Routine Health Assessment",
    "reportLink": "https://curesync.com/reports/farhana-yeasmin-assessment.pdf"
  }
}







DELETE  {{port6009}}/patient/bf3113dc-e70e-4752-aa6e-aa34ad21098d


