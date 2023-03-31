import { Pie } from "react-chartjs-2";
import { formatCurrency } from "../../utils";
import { Expense } from "../../types/expense";

type PieChartProps = {
  expenses: Expense[];
};

const PieChart = ({ expenses }: PieChartProps) => {
  const categories = expenses.reduce((acc, expense) => {
    const category = expense.category.name;
    acc[category] = (acc[category] ?? 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
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
        hoverBackgroundColor: [
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
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        legend: {
          position: "bottom",
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

export default PieChart;
