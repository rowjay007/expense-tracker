"use client"
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { auth } from "@/utils/firebase";
import { userState } from "@/utils/atoms";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { FaTwitterSquare, FaGithubSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import zxcvbn from "zxcvbn";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

export default function RegisterModal() {
  const [user, setUser] = useRecoilState(userState);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
 const {
   register,
   handleSubmit,
   formState: { errors, isValid },
   watch,
 } = useForm<RegisterFormValues>({
   resolver: yupResolver(schema), // use yupResolver to validate the form data
   defaultValues: {
     email: "",
     password: "",
     confirmPassword: "",
     terms: false,
   },
 });

  useEffect(() => {
    if (emailError) {
      // Scroll to the email input field if there is an email error
      document.getElementById("email")?.scrollIntoView();
    }
  }, [emailError]);

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      if (!isValid) {
        console.error("Form is not valid");
        return;
      }

      if (data.password !== data.confirmPassword) {
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
      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email has already been used.");
      } else {
        setEmailError(error.message);
      }
    } finally {
      setIsRegistering(false);
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
            <h2 className="text-xl font-bold mb-4 text-left">
              Create your Free Account
            </h2>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="flex justify-center m-4">
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
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                <p className="px-3 text-sm dark:text-gray-400">Or</p>
                <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              </div>
              <div className="mb-4 text-left">
                <label htmlFor="email">Your email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  value={watch("email")}
                  onChange={(e) => {
                    setEmailError("");
                    register("email").onChange(e);
                  }}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
                {emailError && (
                  <span className="text-red-500">{emailError}</span>
                )}
              </div>
              <div className="mb-4 text-left">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="password (6 or more characters)"
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

              <div className="mb-4 text-left">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
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

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...register("terms", { required: true })}
                  />
                </div>
                <div className="ml-3 text-xs mb-5 flex flex-wrap text-left">
                  <label htmlFor="terms" className="text-gray-900">
                    By signing up, you are creating a Expended account, and you
                    agree to Expended
                    <Link href="/" className="text-blue-600 mx-1">
                      {""}Terms of Use{""}
                    </Link>
                    and
                    <Link href="/" className="text-blue-600 mx-1">
                      {""}
                      Privacy Policy{""}
                    </Link>
                  </label>
                  {errors.terms && <p>This field is required</p>}
                </div>
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
                  "Create an account"
                )}
              </button>

              <div className="mt-8">
                <p className="text-xs text-center sm:px-6text-gray-400">
                  Already have an account?
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="underline text-blue-600 ml-1"
                  >
                    Sign in here
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
