import Layout from "../components/Layout";
import { ExpenseForm, ExpenseList } from "../components/Expense";
import { BarChart, LineChart, PieChart } from "../components/Charts";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-1/2">
          <ExpenseForm />
          <ExpenseList />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-bold mb-4">Expense Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <PieChart />
            <BarChart />
            <LineChart />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
