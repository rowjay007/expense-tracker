import { FC, ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <button
      {...rest}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      disabled={loading}
    >
      {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
      {children}
    </button>
  );
};

export default Button;
