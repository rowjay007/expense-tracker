"use client"
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { auth } from "@/utils/firebase";
import { userState } from "@/utils/atoms";
import { MdClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaTwitterSquare, FaGithubSquare } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";


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
    const router = useRouter();

  const handleLogin = async (data: LoginFormValues) => {
    try {
     
       const { user } = await signInWithEmailAndPassword(
         auth,
         data.email,
         data.password
       );
      setUser(user);
      setIsOpen(false);
      router.push("/dashboard");
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
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <MdClose />
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-left block text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-lg p-2 w-full text-left"
                />
                {errors.email && <span>Email is required</span>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="text-left block text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  aria-describedby="password"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-lg p-2 w-full text-left"
                />
                {errors.password && <span>Password is required</span>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                <p className="px-3 text-sm dark:text-gray-400">
                  Login with social accounts
                </p>
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="mx-4 text-gray-500 hover:text-gray-800">
                  <FcGoogle size={32} />
                </button>
                <button className="mx-4 text-gray-500 hover:text-gray-800">
                  <FaTwitterSquare size={32} />
                </button>
                <button className="mx-4 text-gray-600 hover:text-gray-800">
                  <FaGithubSquare size={32} />
                </button>
              </div>

              <div className="mt-8">
                <p className="text-xs text-center sm:px-6text-gray-400">
                  Do not have an account?
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="underline text-blue-600"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
