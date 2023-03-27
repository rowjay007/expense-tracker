import type { NextApiRequest, NextApiResponse } from "next";
import { expenses } from "../../../data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, amount, category } = req.body;

  if (!name || !amount || !category) {
    res.status(400).json({ message: "Missing required fields." });
  } else {
    const newExpense = {
      id: Date.now().toString(),
      name,
      amount,
      category,
      date: new Date().toISOString(),
    };
    expenses.push(newExpense);
    res.status(201).json(newExpense);
  }
}
