import React from "react";
import { Expense } from "../../types/Expense";

interface ExpenseListItemProps {
  expense: Expense;
}

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ expense }) => {
  return (
    <li className="px-6 py-4 sm:flex sm:items-center sm:justify-between">
      <div className="flex-1 min-w-0">
        <div>
          <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
            {expense.description}
          </div>
          <div className="mt-2 flex">
            <div className="flex items-center text-sm leading-5 text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-1 1v1.586L4.707 7.293A1 1 0 006.121 8.707L7.414 7.414A3 3 0 019.28 6h1.44a3 3 0 012.122.879L16.293 11H17a1 1 0 00.707-.293l2-2A1 1 0 0019 8V3a1 1 0 00-1-1h-9zm2 9a1 1 0 100-2 1 1 0 000 2zm-2 3a1 1 0 100-2 1 1 0 000 2zm4-3a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="truncate">${expense.amount}</span>
            </div>
            <div className="flex items-center text-sm leading-5 text-gray-500 ml-6">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M10 2a8 8 0 016.325 12.942l1.386 1.387a1 1 0 01-1.414 1.414l-1.387-1.386A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="ml-1">{expense.category}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
        </span>
      </div>
    </li>
  );
};

export default ExpenseListItem;
