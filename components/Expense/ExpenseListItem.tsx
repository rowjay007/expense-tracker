import { Expense } from "../../types/expense";
import { EditIcon, TrashIcon } from "@heroicons/react/solid";

type ExpenseListItemProps = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

const ExpenseListItem = ({
  expense,
  onEdit,
  onDelete,
}: ExpenseListItemProps) => {
  const handleEdit = () => {
    onEdit(expense);
  };

  const handleDelete = () => {
    onDelete(expense);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="px-4 py-2">
        <div className="flex items-baseline">
          <span className="text-gray-700 text-lg font-bold mr-2">
            ${expense.amount.toFixed(2)}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(expense.date).toLocaleDateString()}
          </span>
        </div>
        <div className="text-gray-500 text-sm mb-2">{expense.category}</div>
        <div className="text-gray-700 mb-2">{expense.description}</div>
        <div className="flex justify-end">
          <button
            className="text-gray-400 hover:text-gray-500 mr-2"
            onClick={handleEdit}
          >
            <EditIcon className="w-5 h-5" />
          </button>
          <button
            className="text-red-400 hover:text-red-500"
            onClick={handleDelete}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseListItem;
