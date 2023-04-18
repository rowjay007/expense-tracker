import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, queryCache } from 'react-query'
import { createExpense } from '../../pages/api/expenses'

interface FormValues {
  title: string
  amount: number
  description: string
}

const AddExpenseForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useMutation(createExpense, {
    onSuccess: () => {
      queryCache.invalidateQueries("expenses");
      reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.title ? "border-red-500" : ""
          }`}
          id="title"
          type="text"
          placeholder="Enter title"
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          {...register("amount", {
            required: "Amount is required",
            pattern: { value: /^[0-9]*$/, message: "Invalid amount" },
          })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.amount ? "border-red-500" : ""
          }`}
          id="amount"
          type="text"
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs italic">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.description ? "border-red-500" : ""
          }`}
          id="description"
          placeholder="Enter description"
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
      )}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Expense"}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
