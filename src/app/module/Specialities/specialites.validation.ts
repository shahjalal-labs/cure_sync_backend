//
import z from "zod";

const createSpecialitiesValidationSchema = z.object({
  title: z.string({
    message: "title is required",
  }),
});

export const SpecialitiesValidation = {
  createSpecialitiesValidationSchema,
};
