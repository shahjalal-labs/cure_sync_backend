import { ZodTypeAny } from "zod";

export const validateRequest = (schema: ZodTypeAny) => {
  async (req, res, next) => {
    console.log(`validate middlware checking`, req.originalUrl);

    throw new Error("Not implemented");
  };
};
