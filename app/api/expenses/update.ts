import type { NextApiRequest, NextApiResponse } from "next";
import { expenses } from "../../../data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, amount, category } = req.body;
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    res.status(404).json({ message: `Expense with ID ${id} not found.` });
  } else if (!name || !amount || !category) {
    res.status(400).json({ message: "Missing required fields." });
  } else {
    const updatedExpense = {
      id,
      name,
      amount,
      category,
      date: expenses[index].date,
    };
    expenses[index] = updatedExpense;
    res.status(200).json(updatedExpense);
  }
}
