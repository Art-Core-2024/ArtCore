import { z } from 'zod';

export const userSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
      "Invalid email domain"
    ),
  username: z.string().min(1, "Username is required"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be a valid 10-digit number"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Password must contain at least one special character"),
  role: z.string().default('user'),
  address: z.array(z.string()).optional(), // Update to validate an array of strings
});

export type UserSignupSchema = z.infer<typeof userSignupSchema>;