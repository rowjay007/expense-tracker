import { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { auth } from "@/utils/firebase";
import { userState } from "@/utils/state";
import { FaTimes } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";


type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterModal() {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

 const handleRegister = async (data: RegisterFormValues) => {
   try {
     const { user } = await createUserWithEmailAndPassword(
       auth,
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
        Register
      </button>
      {isOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", { required: true })}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    Confirm Password is required
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}