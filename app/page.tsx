import React from "react";
import Head from "next/head";
import LoginModal from "../components/login-modal";
import RegisterModal from "../components/register-modal";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "../components/dashboard/dashboard";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Expense Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <main className="bg-white relative w-full max-w-md mx-auto rounded-lg shadow-xl overflow-hidden">
          <h1 className="text-4xl font-bold text-gray-900 mt-12">
            Welcome to Expense Tracker
          </h1>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4 mb-8">
            Explore our trackers
          </h3>
          {user ? <Dashboard /> : <LoginModal />}
          <RegisterModal />
        </main>
      </div>
    </>
  );
};

export default Home;
