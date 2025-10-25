//
import z from "zod";

const createSpecialitiesValidationSchema = z.object({
  title: z.enum([
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "General Surgery",
    "Hematology",
    "Internal Medicine",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology (ENT)",
    "Pediatrics",
    "Plastic Surgery",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Urology",
    "Anesthesiology",
    "Emergency Medicine",
    "Family Medicine",
    "Geriatrics",
    "Infectious Disease",
    "Pathology",
    "Physical Medicine and Rehabilitation",
    "Sports Medicine",
    "Allergy and Immunology",
  ]),
});

export const SpecialitiesValidation = {
  createSpecialitiesValidationSchema,
};
