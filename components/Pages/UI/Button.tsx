// components/UI/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  className = '',
  children,
}) => (
  <button
    type={type}
    className={`py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
