import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { register } from "../api/auth";

type RegisterFormProps = {
  onSuccess: () => void;
};

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      await register(data.email, data.password);
      onSuccess();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = password === confirmPassword;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={register({
            required: "Please enter your email",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
          className={`form-input ${errors.email ? "border-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          ref={register({
            required: "Please enter a password",
            minLength: {
              value: 6,
              message: "Your password must be at least 6 characters",
            },
          })}
          className={`form-input ${errors.password ? "border-red-500" : ""}`}
          disabled={isLoading}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 font-bold mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          ref={register({
            required: "Please confirm your password",
            validate: (value) => {
              return value === password || "The passwords do not match";
            },
          })}
          className={`form-input ${
            errors.confirmPassword ? "border-red-500" : ""
          }`}
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={!passwordsMatch || isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </div>
    </form>
  );
}
