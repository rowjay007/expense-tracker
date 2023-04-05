import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, error, ...rest },
  ref
) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={rest.id || rest.name}
        className="block mb-2 text-sm font-bold text-gray-700"
      >
        {label}
      </label>
      <input
        ref={ref}
        {...rest}
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs italic mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default forwardRef(TextInput);
