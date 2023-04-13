import { useState } from "react";
import useForm from "@/hooks/useForm";
import { Button } from "./Button";
import { Modal } from "./Modal";
import TextInput from "./TextInput";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { values, errors, handleChange, handleSubmit } = useForm(
    type === "login" ? handleLogin : handleRegister,
    {
      email: "",
      password: "",
      confirmPassword: "",
    }
  );

  function handleLogin() {
    // handle login logic
    setModalMessage("Logged in successfully!");
    setShowModal(true);
  }

  function handleRegister() {
    // handle register logic
    setModalMessage("Registered successfully!");
    setShowModal(true);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {type === "login" ? "Log in" : "Register"}
      </h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextInput
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        {type === "register" && (
          <TextInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        )}
        <Button type="submit">
          {type === "login" ? "Log in" : "Register"}
        </Button>
      </form>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {modalMessage}
            </h3>
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
