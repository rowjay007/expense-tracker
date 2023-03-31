import { Bar } from "react-chartjs-2";
import { formatCurrency } from "../../utils";
import { Expense } from "../../types/expense";

type BarChartProps = {
  expenses: Expense[];
};

const BarChart = ({ expenses }: BarChartProps) => {
  const categories = expenses.reduce((acc, expense) => {
    const category = expense.category.name;
    acc[category] = (acc[category] ?? 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by category",
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#2ecc71",
          "#3498db",
          "#f1c40f",
          "#e74c3c",
          "#9b59b6",
          "#34495e",
        ],
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Bar
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
              return `${data.labels[tooltipItem.index]}: ${formatCurrency(
                amount
              )}`;
            },
          },
        },
      }}
    />
  );
};

export default BarChart;
