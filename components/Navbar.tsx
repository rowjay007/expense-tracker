import { useState } from "react";
import LoginModal from "../components/LoginModal";

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <a onClick={handleLoginModalOpen}>Login</a>
        </li>
        ...
      </ul>
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} />}
    </nav>
  );
}
