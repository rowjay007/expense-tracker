import type { NextApiRequest, NextApiResponse } from "next";
import { expenses } from "../../../data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) {
    res.status(404).json({ message: `Expense with ID ${id} not found.` });
  } else {
    res.status(200).json(expense);
  }
}
