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

const changePasswordValidationSchema = z.object({
  body: z
    .object({
      oldPassword: z.string(),
      newPassword: z.string(),
    })
    .strict(),
});

const forgotPasswordValidationSchema = z.object({
  body: z
    .object({
      email: z.string(),
    })
    .strict(),
});

const resetPasswordValidationSchema = z.object({
  body: z
    .object({
      id: z.string(),
      newPassword: z.string(),
    })
    .strict(),
});
export const AuthValidationSchema = {
  userLoginValidationSchema,
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
};
