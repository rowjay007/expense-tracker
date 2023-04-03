// components/UI/Spinner.tsx
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  let sizeClass = 'h-4 w-4';
  if (size === 'sm') {
    sizeClass = 'h-3 w-3';
  } else if (size === 'lg') {
    sizeClass = 'h-5 w-5';
  }
  return (
    <svg
      className={`animate-spin text-blue-500 ${sizeClass} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16zm-4 4a4 4 0 110-8 4 4 0 010 8z"
      ></path>
    </svg>
  );
};

export default Spinner;
