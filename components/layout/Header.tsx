import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">Expense Tracker</a>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">
                <a className="text-gray-800 hover:text-gray-600">Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="text-gray-800 hover:text-gray-600">Login</a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                  Register
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
