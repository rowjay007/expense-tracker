import { Expense } from "@/types/Expenses";
import { atom } from "recoil";

export const expensesState = atom<Expense[]>({
  key: "expensesState",
  default: [],
});
