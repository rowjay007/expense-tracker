"use client";
import AuthProvider from "../AuthProvider";
import Dashboard from "@/components/Dashboard";
import DashboardPage from "./dashboard/page";

const Home = () => {
  return (
    <AuthProvider>
      <Dashboard />
      <DashboardPage />
    </AuthProvider>
  );
};

export default Home;
