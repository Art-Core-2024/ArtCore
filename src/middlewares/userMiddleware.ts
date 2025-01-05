export const userMiddleware = async (body) => {
  const { name, email, username, phoneNumber, password } = body;

  // Perform schema validation (e.g., using Zod or custom checks)
  if (!name || !email || !username || !phoneNumber || !password) {
    return { message: 'Missing required fields' };
  }

  // Return null if no errors
  return null;
};