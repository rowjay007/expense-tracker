import React from "react";
import { Bar } from "react-chartjs-2";
import { Expense } from "../types/Expense";

type ChartProps = {
  expenses: Expense[];
};

const Chart: React.FC<ChartProps> = ({ expenses }) => {
  // Convert expenses into an array of amounts
  const amounts = expenses.map((expense) => expense.amount);

  // Get the total expenses
  const totalExpenses = amounts.reduce((acc, curr) => acc + curr, 0);

  // Calculate the percentage of each expense
  const percentages = amounts.map((amount) => (amount / totalExpenses) * 100);

  // Chart data
  const data = {
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        label: "Expenses",
        data: amounts,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Expenses Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
