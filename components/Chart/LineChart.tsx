import { Line } from "react-chartjs-2";
import { formatCurrency } from "../../utils";
import { Expense } from "../../types/expense";

type LineChartProps = {
  expenses: Expense[];
};

const LineChart = ({ expenses }: LineChartProps) => {
  const data = {
    labels: expenses.map((expense) => expense.date),
    datasets: [
      {
        label: "Expenses over time",
        data: expenses.map((expense) => expense.amount),
        fill: false,
        backgroundColor: "#1e3a8a",
        borderColor: "#1e3a8a",
      },
    ],
  };

  return (
    <Line
      data={data}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value: number) => formatCurrency(value),
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any) => {
              const amount = data.datasets[0].data[tooltipItem.index];
              return formatCurrency(amount);
            },
          },
        },
      }}
    />
  );
};

export default LineChart;
