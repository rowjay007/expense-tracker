import React from "react";
import { Expense } from "../../types/Expense";
import ExpenseListItem from "./ExpenseListItem";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <ul className="bg-white rounded shadow overflow-hidden divide-y divide-gray-200">
      {expenses.map((expense) => (
        <ExpenseListItem key={expense.id} expense={expense} />
      ))}
    </ul>
  );
};

export default ExpenseList;
