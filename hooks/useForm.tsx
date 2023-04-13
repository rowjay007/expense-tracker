import { useState } from "react";

type Inputs = {
  [key: string]: string;
};

type Errors = {
  [key: string]: string;
};

type ValidationRules = {
  [key: string]: (value: string) => boolean;
};

type FormSubmitCallback = (inputs: Inputs) => Promise<void>;

type FormHook = {
  inputs: Inputs;
  errors: Errors;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    callback: FormSubmitCallback,
    validations?: ValidationRules
  ) => void;
};

const useForm = (initialValues: Inputs): FormHook => {
  const [inputs, setInputs] = useState<Inputs>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (
    callback: FormSubmitCallback,
    validations?: ValidationRules
  ) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (validations) {
        const errors: Errors = {};
        Object.keys(validations).forEach((key) => {
          const isValid = validations[key](inputs[key]);
          if (!isValid) {
            errors[key] = "Invalid value";
          }
        });
        setErrors(errors);
        if (Object.keys(errors).length > 0) {
          return;
        }
      }
      await callback(inputs);
    };
  };

  return {
    inputs,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
