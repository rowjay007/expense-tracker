import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";
import { Input } from "./Input";
import { Modal } from "./Modal";

type LoginFormInputs = {
  email: string;
  password: string;
};

type LoginFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginForm({ isOpen, onClose }: LoginFormProps) {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async ({ email, password }: LoginFormInputs) => {
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Login to Expense Tracker</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />
        <Button type="submit">Login</Button>
      </form>
    </Modal>
  );
}
