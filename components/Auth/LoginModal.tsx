import { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { auth } from "@/utils/firebase";
import { userState } from "@/utils/state";
import { MdClose } from "react-icons/md";

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
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Login
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <MdClose />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                {errors.email && <span>Email is required</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                {errors.password && <span>Password is required</span>}
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
