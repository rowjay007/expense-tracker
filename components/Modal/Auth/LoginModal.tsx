import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { login } from "../lib/firebase/firebase";
import { userState } from "../lib/recoil/recoil";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<LoginFormValues>();
  const [user, setUser] = useRecoilState(userState);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const user = await login(data.email, data.password);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" name="email" ref={register({ required: true })} />
      {errors.email && <span>Email is required</span>}
      <input
        type="password"
        name="password"
        ref={register({ required: true })}
      />
      {errors.password && <span>Password is required</span>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
