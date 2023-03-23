import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getExpenses = async (req: Request, res: Response) => {
  const expenses = await prisma.expense.findMany();
  res.json(expenses);
};

const getTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

const createUser = async (data: any) => {
  const user = await prisma.user.create({ data });
  return user;
};

const createTask = async (data: any) => {
  const task = await prisma.task.create({ data });
  return task;
};

export { getExpenses, getTasks, createUser, createTask };
