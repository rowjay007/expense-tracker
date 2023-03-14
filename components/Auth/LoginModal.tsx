import { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { auth } from "@/utils/firebase";
import { userState } from "@/utils/state";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginModal() {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      setUser(user);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Login</button>
      {isOpen && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
}
