import { useForm } from "react-hook-form";
import { Expense } from "../../types/expense";

type ExpenseFormProps = {
  categories: string[];
  expense: Expense | null;
  onSubmit: (expense: Expense) => void;
  onClose: () => void;
};

const ExpenseForm = ({
  categories,
  expense,
  onSubmit,
  onClose,
}: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Expense>({
    defaultValues: expense ?? {
      id: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      category: categories[0],
      description: "",
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden w-96">
        <form onSubmit={handleFormSubmit} className="p-4">
          <h3 className="text-gray-800 text-lg font-bold mb-4">
            {expense ? "Edit" : "Add"} Expense
          </h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("amount", { required: true, min: 0 })}
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">
                Please enter a valid amount
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">
                Please enter a valid date
              </span>
            )}
          </div>{" "}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("category", { required: true })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-sm">
                Please select a category
              </span>
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
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register("description")}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;