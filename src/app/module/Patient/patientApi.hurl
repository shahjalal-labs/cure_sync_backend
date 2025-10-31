GET {{port6009}}/patients


GET {{port6009}}/patients?searchTerm=sa&page=1&limit=15&sortBy=name&sortOrder=asc&name=javed%20hossain


GET {{port6009}}/patients/93f32bcb-a1eb-4462-b682-f60317951e93


DELETE  {{port6009}}/patients/soft/93f32bcb-a1eb-4462-b682-f60317951e93


DELETE  {{port6009}}/patients/soft/93f32bcb-a1eb-4462-b682-f60317951e93




PATCH {{port6009}}/patients/93f32bcb-a1eb-4462-b682-f60317951e93
Content-Type: application/json

{
  "name": "Aminul Islam",
  "contactNumber": "01712345678",
  "address": "House 45, Road 10, Dhanmondi, Dhaka",
  "medicalReport": {
    "reportName": "Blood Test Report",
    "reportLink": "https://example.com/reports/blood-test-2025.pdf"
  }
}

bf3113dc-e70e-4752-aa6e-aa34ad21098d


DELETE  {{port6009}}/patient/bf3113dc-e70e-4752-aa6e-aa34ad21098d


