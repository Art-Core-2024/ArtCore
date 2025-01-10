import { userSignupSchema } from '@/schemas/userSchema';

export const userMiddleware = async (body: any) => {
  try {
    userSignupSchema.parse(body); // Validate body against Zod schema
    return null; // Return null if no validation errors
  } catch (error) {
    if (error instanceof Error) {
      return { message: 'Validation failed', errors: (error as any).errors };
    }
    return { message: 'Unknown validation error' };
  }
};