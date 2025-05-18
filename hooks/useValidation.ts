import { useState } from "react";
import { z } from "zod";
import { ValidationSchema } from "@/lib/validationSchema";

interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export const useValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (
    field: keyof ValidationSchema,
    value: unknown,
    schema: z.ZodType<unknown>
  ): ValidationResult => {
    try {
      schema.parse(value);
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
      return { isValid: true, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
        return { isValid: false, error: errorMessage };
      }
      return { isValid: false, error: "Invalid input" };
    }
  };

  return { validate, errors };
};
