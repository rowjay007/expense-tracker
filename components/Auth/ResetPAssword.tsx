import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../utils/firebase";
import { Input, Button, Spinner } from "../UI";

type ResetPasswordFormValues = {
  email: string;
};

const ResetPasswordModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  const handleResetPassword = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      await auth.sendPasswordResetEmail(data.email);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordModal;
