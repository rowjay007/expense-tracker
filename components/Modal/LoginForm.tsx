import React from "react";
import Modal from "react-modal";
import LoginForm from "./LoginForm";

type AuthModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onRequestClose }) => {
  const handleLoginFormSubmit = (data: FormData) => {
    // Handle login form submission
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Login/Register</h2>
        <button className="modal-close" onClick={onRequestClose}>
          X
        </button>
      </div>
      <div className="modal-body">
        <LoginForm onSubmit={handleLoginFormSubmit} />
      </div>
    </Modal>
  );
};

export default AuthModal;
