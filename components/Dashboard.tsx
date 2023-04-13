import { expensesState } from "@/state/expnesesState";
import { Expense } from "@/types/Expenses";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import AddExpenseModal from "./AddExpenseModal";
import { Button } from "./Button";
import ExpenseTable from "./ExpenseTable";

export function Dashboard() {
  const [expenses, setExpenses] = useRecoilState(expensesState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch expenses from the database
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await fetch("/api/expenses");
        const expenses = await response.json();
        setExpenses(expenses);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExpenses();
  }, [setExpenses]);

  // handle adding a new expense
  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to the expense tracker
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Expense</Button>
      </div>

      <ExpenseTable expenses={expenses} />

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
}
