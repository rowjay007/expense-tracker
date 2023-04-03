import prisma from "../../../lib/prisma";

// Handler function for GET requests to /api/expenses/:id
export default async function handler(req, res) {
  const expenseId = req.query.id;

  if (req.method === "GET") {
    // Use Prisma to query the database for the expense with the specified ID
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId },
    });

    if (expense) {
      // Return the expense as a JSON response if it exists
      res.status(200).json(expense);
    } else {
      // Return a 404 error if the expense does not exist
      res.status(404).send();
    }
  } else {
    // Return a 404 error for all other HTTP methods
    res.status(404).send();
  }
}
