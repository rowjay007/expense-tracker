import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "../utils/firebase";

type LoginFormProps = {
  onSuccess: () => void;
};

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signInWithEmailAndPassword(values.email, values.password);
      onSuccess();
    } catch (e) {
      setError(e.message);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" disabled={formState.isSubmitting}>
        Login
      </button>
    </form>
  );
}
