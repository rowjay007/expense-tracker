// components/UI/Input.tsx
import React from "react";

interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: "on" | "off";
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  name = "",
  value,
  onChange,
  placeholder = "",
  autoComplete = "on",
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default Input;
