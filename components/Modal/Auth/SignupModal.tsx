import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { signIn } from "../lib/nextauth/nextauth";
import { userState } from "../lib/recoil/recoil";

interface SigninFormValues {
  email: string;
}

const Signin: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<SigninFormValues>();
  const [user, setUser] = useRecoilState(userState);

  const onSubmit = async (data: SigninFormValues) => {
    try {
      const user = await signIn(data.email);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" name="email" ref={register({ required: true })} />
      {errors.email && <span>Email is required</span>}
      <button type="submit">Signin</button>
    </form>
  );
};

export default Signin;
