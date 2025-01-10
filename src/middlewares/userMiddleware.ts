import { userSignupSchema } from '@/schemas/userSchema';
import { ZodError } from 'zod';
import { UserSignupSchema } from '@/schemas/userSchema';

export const userMiddleware = async (body: UserSignupSchema) => {
  try {
    userSignupSchema.parse(body); // Validate body against Zod schema
    return null; // Return null if no validation errors
  } catch (error) {
    if (error instanceof Error) {
      return { message: 'Validation failed', errors: (error as ZodError).errors };
    }
    return { message: 'Unknown validation error' };
  }
};