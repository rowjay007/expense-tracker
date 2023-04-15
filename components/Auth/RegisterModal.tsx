import { useState } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { auth } from "@/utils/firebase";
import { userState } from "@/utils/atoms";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import zxcvbn from "zxcvbn";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterModal() {
  const [user, setUser] = useRecoilState(userState);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }, // Update to destructure isValid from formState
    watch,
  } = useForm<RegisterFormValues>();
  const router = useRouter();
  const password = watch("password"); // Watch the "password" field value

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      if (!isValid) {
        // Update to use isValid from formState
        console.error("Form is not valid");
        return;
      }

      if (data.password !== data.confirmPassword) {
        // Password and confirm password do not match, display error message
        console.error("Passwords do not match");
        return;
      }
      setIsRegistering(true);

      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser(user);
      setIsOpen(false);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
       } finally {
      setIsRegistering(false); // Set isRegistering to false when registration process is complete
    
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
                  onChange={(e) => {
                    const score = zxcvbn(e.target.value).score;
                    setPasswordScore(score);
                  }}
                />
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
                )}
                {passwordScore > 0 && (
                  <div className="mt-2">
                    <div
                      className={`h-2 rounded-sm ${
                        passwordScore < 2
                          ? "bg-red-500"
                          : passwordScore < 3
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${(passwordScore / 4) * 100}%` }}
                    ></div>
                    <div className="text-sm font-medium text-gray-500 mt-1">
                      {passwordScore < 2
                        ? "Weak"
                        : passwordScore < 3
                        ? "Fair"
                        : "Strong"}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required", // Set custom error message
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}{" "}
                    {/* Display custom error message */}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  // Render the spinning icon while registering
                  <div className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
