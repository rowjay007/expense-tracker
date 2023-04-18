import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Expense } from "../../types";
import { editExpense } from "../../api/expenses";

type EditExpenseFormProps = {
  expense: Expense;
  onSuccess: () => void;
  onCancel: () => void;
};

type FormData = {
  description: string;
  amount: number;
  date: string;
};

const EditExpenseForm = ({
  expense,
  onSuccess,
  onCancel,
}: EditExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
    },
  });

  const mutation = useMutation(editExpense, {
    onSuccess: () => {
      onSuccess();
    },
  });

  const onSubmit = (data: FormData) => {
    const updatedExpense: Expense = {
      id: expense.id,
      description: data.description,
      amount: data.amount,
      date: data.date,
    };
    mutation.mutate(updatedExpense);
  };

  const handleCancelClick = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <input
          {...register("description", { required: "Description is required" })}
          type="text"
          name="description"
          id="description"
          placeholder="Enter description"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          {...register("amount", { required: "Amount is required" })}
          type="number"
          name="amount"
          id="amount"
          placeholder="Enter amount"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.amount && (
          <p className="text-red-500 text-xs italic">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input
          {...register("date", { required: "Date is required" })}
          type="date"
          name="date"
          id="date"
          placeholder="Select date"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.date && (
          <p className="text-red-500 text-xs italic">{errors.date.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleCancelClick}
          disabled={mutation.isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
export default EditExpenseForm;
