import { useState } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "../utils/state";
import { signOut } from "../utils/firebase";
import { AuthForm } from "./AuthForm";

export default function Navbar() {
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-4">
      <div className="text-white font-bold text-xl">
        <Link href="/">Expense Tracker</Link>
      </div>
      <div>
        {user ? (
          <button className="text-white" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="text-white" onClick={handleModalOpen}>
            Login
          </button>
        )}
      </div>
      <AuthForm isOpen={isModalOpen} onClose={handleModalClose} />
    </nav>
  );
}
