// utils/validation.ts

interface ValidationResponse {
  valid: boolean;
  message?: string;
}

export function validateEmail(email: string): ValidationResponse {
  if (!email) {
    return { valid: false, message: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, message: "Invalid email format" };
  }

  return { valid: true };
}

export function validatePassword(password: string): ValidationResponse {
  if (!password) {
    return { valid: false, message: "Password is required" };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long",
    };
  }

  return { valid: true };
}
