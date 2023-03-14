"use client"
import React, { useState } from "react";
import { Inter } from "next/font/google";
import UserModal from "@/components/Auth/UserModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
 
  return (
          <div>
      <h1>Welcome to my app!</h1>
      <h3>Please log in or register to continue</h3>
      <UserModal />
    </div>
  
  );
}
