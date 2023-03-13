import React from "react";
import Modal from "react-modal";

type AuthModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg"
    >
      <div className="modal-header flex justify-between items-center mb-6">
        <h2 className="modal-title text-2xl font-bold">Login/Register</h2>
        <button
          className="modal-close text-gray-500 hover:text-gray-700"
          onClick={onRequestClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="modal-body">{/* Add login/register form here */}</div>
    </Modal>
  );
};

export default AuthModal;
