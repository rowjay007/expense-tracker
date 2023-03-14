import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { firebaseClient } from '@/lib/firebase';
import { useRecoilState } from 'recoil';
import { authState } from '@/atoms/auth';

type RegisterFormInputs = {
  email: string;
  password: string;
};

const RegisterModal = ({ onClose }: { onClose: () => void }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [auth, setAuth] = useRecoilState(authState);
  const { register, handleSubmit, formState } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const { user } = await firebaseClient
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      if (user) {
        setAuth(user);
        onClose();
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Register
                  </h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className={`appearance-none border ${
                          formState.errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {formState.errors.email && (
                        <p className="text-red-500 text-xs italic">
                          {formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="new-password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className={`appearance-none border ${
                          formState.errors.password
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                      {formState.errors.password && (
                        <p className="text-red-500 text-xs italic">
                          {formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-xs italic">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Register
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};