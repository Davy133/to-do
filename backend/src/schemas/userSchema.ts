import { z } from "zod";

const GenderEnum = z.enum(["male", "female", "other"]);

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  gender: GenderEnum,
  age: z.number().int(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  age: z.number().int().optional(),
  profilePicture: z.string().url().optional(),
});
