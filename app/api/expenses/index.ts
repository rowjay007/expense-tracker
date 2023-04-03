import prisma from "../../../lib/prisma";

// Handler function for GET requests to /api/expenses
export default async function handler(req, res) {
  if (req.method === "GET") {
    // Use Prisma to query the database for all expenses
    const expenses = await prisma.expense.findMany();

    // Return the expenses as a JSON response
    res.status(200).json(expenses);
  } else {
    // Return a 404 error for all other HTTP methods
    res.status(404).send();
  }
}
