"use client"
import React, { useState } from "react";
import { Inter } from "next/font/google";
import UserModal from "@/components/Auth/UserModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to my app!</h1>
      <h3 className="text-lg md:text-3xl mb-8">
        Please log in or register to continue
      </h3>
      <UserModal />
    </div>
  );
}
