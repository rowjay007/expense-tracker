import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState } from "../../utils/recoil";
import { auth } from "../../utils/firebase";
import { Input, Button, Spinner } from "../UI";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginModal = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { user: authUser } = await auth.signInWithEmailAndPassword(
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
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
          {isLoading ? <Spinner /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginModal;
