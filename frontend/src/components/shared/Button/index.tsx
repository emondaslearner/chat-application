import React, { ReactNode } from "react";

interface ButtonProps {
  fill: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ fill, children, className, onClick }) => {
  return (
    <>
      {fill ? (
        <button
          className={`${className} bg-primary_ text-white_ border-0 px-10 py-2 rounded-[5px]`}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <button
          className={`${className} text-primary_ border-[1px] border-primary_ bg-transparent px-10 py-2 rounded-[5px]`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

Button.defaultProps = {
  fill: false,
};

export default Button;
