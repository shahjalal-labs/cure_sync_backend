//
import z from "zod";

const userLoginValidationSchema = z.object({
  body: z
    .object({
      email: z.email(),
      password: z.string(),
    })
    .strict(),
});

export const AuthValidationSchema = {
  userLoginValidationSchema,
};
