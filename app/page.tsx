"use client"
import AuthProvider from "../AuthProvider";
import Dashboard from "@/components/Dashboard";

const Home = () => {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

export default Home;
