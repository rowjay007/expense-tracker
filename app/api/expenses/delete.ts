import type { NextApiRequest, NextApiResponse } from "next";
import { expenses } from "../../../data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    res.status(404).json({ message: `Expense with ID ${id} not found.` });
  } else {
    expenses.splice(index, 1);
    res.status(204).end();
  }
}
