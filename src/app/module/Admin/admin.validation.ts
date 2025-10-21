//
import z from "zod";

const updateAdminValidationSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).max(50),
      contactNumber: z.string().min(10).max(15),
    })
    .strict()
    .partial(),
});

export const AdminValidationSchema = {
  updateAdminValidationSchema,
};
