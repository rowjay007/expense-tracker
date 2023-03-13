"use client"
import React, { useState } from "react";
import AuthModal from "@/components/Modal/AuthModal";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl md:text-6xl text-center font-bold mb-4">
        Welcome to our Expense Tracker
      </h1>
      <h3 className="text-lg md:text-2xl text-center font-medium mb-8">
        Add, edit, view, and delete expenses with ease
      </h3>
      <div className="flex flex-row space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleModalOpen}
        >
          Login
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          onClick={handleModalOpen}
        >
          Register
        </button>
      </div>
      <AuthModal isOpen={isModalOpen} onRequestClose={handleModalClose} />
    </div>
  );
}
