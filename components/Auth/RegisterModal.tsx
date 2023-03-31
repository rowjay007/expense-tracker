import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/recoil";
import { auth } from "../../utils/firebase";
import { Input, Button, Spinner } from "../UI";

type RegisterFormValues = {
  email: string;
  password: string;
};

const RegisterModal = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const handleRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { user: authUser } = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      setUser({ uid: authUser.uid, email: authUser.email });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterModal;
