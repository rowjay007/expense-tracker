import { useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseClient } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validatePassword } from "@/utils/validate";
import { XIcon } from "@heroicons/react/outline";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, errors } = useForm<LoginFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();

  const handleLogin = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      await firebaseClient.loginUser(data.email, data.password);
      const currentUser = await firebaseClient.getCurrentUser();
      login(currentUser);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <XIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Login
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit(handleLogin)}>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              ref={register({
                                required: true,
                                validate: validateEmail,
                              })}
                              className={`${
                                errors.email ? "border-red-300" : ""
                              } appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              placeholder="Enter your email address"
                              autoComplete="email"
                            />
                            {errors.email && (
                              <p className="mt-2 text-sm text-red-600">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <div className="mt-1">
                            <input
                              type="password"
                              name="password"
                              id="password"
                              ref={register({
                                required: true,
                                validate: validatePassword,
                              })}
                              className={`${
                                errors.password ? "border-red-300" : ""
                              } appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                              placeholder="Enter your password"
                              autoComplete="current-password"
                            />
                            {errors.password && (
                              <p className="mt-2 text-sm text-red-600">
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {errorMessage && (
                          <p className="mt-2 text-sm text-red-600">
                            {errorMessage}
                          </p>
                        )}

                        <div className="mt-4">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className={`${
                              isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            } w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          >
                            {isLoading ? (
                              <svg
                                className="animate-spin h-5 w-5 mr-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"
                                ></path>
                              </svg>
                            ) : (
                              "Login"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};