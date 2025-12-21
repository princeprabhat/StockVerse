import { ZodError, type ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

type ValidationSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validate = (schema: ValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        await schema.body.parseAsync(req.body);
      }

      if (schema.params) {
        await schema.params.parseAsync(req.params);
      }

      if (schema.query) {
        await schema.query.parseAsync(req.query);
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: ValidationError[] = err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }

      next(err);
    }
  };
};
