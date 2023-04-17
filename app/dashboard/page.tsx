"use client"
import React from "react";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Use auth.signOut instead of signOut
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
