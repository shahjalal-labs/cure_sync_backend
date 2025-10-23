import z from "zod";

const createAdminValidationSchema = z.object({
  password: z.string({}),
});

export const userValidation = {
  createAdmin: createAdminValidationSchema,
};
