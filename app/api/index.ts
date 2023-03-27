import { NextApiRequest, NextApiResponse } from "next";
import login from "./auth/login";
import register from "./auth/register";
import resetPassword from "./auth/resetPassword";
import getExpense from "./expenses/[id]";
import createExpense from "./expenses/create";
import deleteExpense from "./expenses/delete";
import updateExpense from "./expenses/update";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      switch (req.url) {
        case "/api/auth/login":
          return login(req, res);
        case "/api/auth/register":
          return register(req, res);
        case "/api/auth/resetPassword":
          return resetPassword(req, res);
        case "/api/expenses":
          return createExpense(req, res);
        default:
          res.status(404).end();
      }
      break;
    case "GET":
      switch (true) {
        case /^\/api\/expenses\/\d+$/.test(req.url):
          return getExpense(req, res);
        default:
          res.status(404).end();
      }
      break;
    case "PUT":
      switch (true) {
        case /^\/api\/expenses\/\d+$/.test(req.url):
          return updateExpense(req, res);
        default:
          res.status(404).end();
      }
      break;
    case "DELETE":
      switch (true) {
        case /^\/api\/expenses\/\d+$/.test(req.url):
          return deleteExpense(req, res);
        default:
          res.status(404).end();
      }
      break;
    default:
      res.status(405).end();
  }
}
