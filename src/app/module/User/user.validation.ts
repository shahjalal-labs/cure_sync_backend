import z from "zod";

const createAdminValidationSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string({}),
    email: z.string(),
    contactNumber: z.string(),
  }),
});

export const userValidation = {
  createAdminValidationSchema,
};
