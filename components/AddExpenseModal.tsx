import React, { useState } from "react";

import TextInput from "./TextInput";
import { useRecoilState } from "recoil";
import { Modal } from "./Modal";
import { Button } from "./Button";
import useForm from "@/hooks/useForm.tss";
import { expensesState } from "@/state/expnesesState";
import { Expense } from "@/types/Expenses";

type Props = {
  onClose: () => void;
};

const AddExpenseModal: React.FC<Props> = ({ onClose }) => {
  const [expenses, setExpenses] = useRecoilState(expensesState);
  const { inputs, handleChange, handleSubmit } = useForm({
    title: "",
    amount: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const saveExpense = async (expense: Expense) => {
    setIsSaving(true);
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    setIsSaving(false);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit(saveExpense)}>
        <TextInput
          label="Title"
          name="title"
          value={inputs.title}
          onChange={handleChange}
        />
        <TextInput
          label="Amount"
          name="amount"
          value={inputs.amount}
          onChange={handleChange}
        />
        <div className="mt-4">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Expense"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
