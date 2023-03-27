import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import LoginForm from "./LoginForm";

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Dialog.Title className="text-lg font-medium">
                Log In
              </Dialog.Title>

              <button onClick={onClose}>
                <XIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
              </button>
            </div>

            <div className="p-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginModal;
