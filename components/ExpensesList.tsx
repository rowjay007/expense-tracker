import { useRecoilValue } from "recoil";
import { expenseListState } from "@/store/atoms";

const ExpensesList = () => {
  const expenses = useRecoilValue(expenseListState);

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <p>{expense.description}</p>
          <p>{expense.amount}</p>
          <p>{expense.date}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpensesList;
