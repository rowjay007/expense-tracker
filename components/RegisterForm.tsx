import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "../utils/firebase";

type RegisterFormProps = {
  onSuccess: () => void;
};

type RegisterFormValues = {
  email: string;
  password: string;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register, handleSubmit, formState } = useForm<RegisterFormValues>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createUserWithEmailAndPassword(values.email, values.password);
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
        Register
      </button>
    </form>
  );
}
