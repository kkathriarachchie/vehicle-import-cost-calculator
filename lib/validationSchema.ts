import { z } from "zod";

export const validationSchema = {
  engineCC: z
    .number()
    .min(1, "Engine capacity is required")
    .max(9999999, "Engine capacity cannot exceed 9,999,999 CC")
    .int("Engine capacity must be a whole number"),

  vehiclePrice: z
    .number()
    .min(1, "Vehicle price is required")
    .positive("Vehicle price must be positive"),

  cifPercentage: z
    .number()
    .min(0, "CIF percentage cannot be negative")
    .max(100, "CIF percentage cannot exceed 100%")
    .default(20),

  adminCharge: z
    .number()
    .min(0, "Admin charge cannot be negative")
    .nullable()
    .default(0),

  fuelType: z.enum(["Petrol", "Diesel", "Petrol Hybrid", "Diesel Hybrid"], {
    required_error: "Please select a fuel type",
  }),
};

export type ValidationSchema = typeof validationSchema;
