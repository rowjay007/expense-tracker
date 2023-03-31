import { Expense } from "../../types/expense";
import { formatCurrency } from "../../utils";
import { TrashIcon, PencilIcon } from "react-heroicons";

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
    <div className="bg-white rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <div className="font-bold text-gray-800">{expense.category.name}</div>
        <div className="text-sm text-gray-500">{expense.date}</div>
      </div>
      <div className="flex items-center">
        <div className="mr-4 font-bold text-gray-800">
          {formatCurrency(expense.amount)}
        </div>
        <button className="p-1 mr-2" onClick={handleEdit}>
          <PencilIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </button>
        <button className="p-1" onClick={handleDelete}>
          <TrashIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseListItem;
