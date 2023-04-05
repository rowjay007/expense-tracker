import { expensesState } from "@/state/expnesesState";
import { Expense } from "@/types/Expenses";
import { useRecoilValue } from "recoil";

const ExpenseTable = () => {
  const expenses = useRecoilValue(expensesState);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense: Expense) => (
          <tr key={expense.id}>
            <td>{expense.id}</td>
            <td>{expense.date}</td>
            <td>{expense.category}</td>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
