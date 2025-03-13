"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  danger?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
  rounded?: "lg" | "xl" | "full";
  secondary?: boolean;
  className?: string;
  autoPadding?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  onClick,
  children,
  danger,
  outline,
  fullWidth,
  secondary,
  rounded = "lg",
  className,
  autoPadding,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `font-montserrat flex cursor-pointer items-center justify-center gap-x-2 text-center text-sm transition-all duration-300`,
        disabled ? "opacity-55" : "active:scale-95",
        rounded === "lg" && "rounded-lg",
        rounded === "xl" && "rounded-xl",
        rounded === "full" && "rounded-full",
        secondary &&
          "bg-primaryGreen hover:bg-secondaryGreen disabled:hover:bg-primaryGreen text-white",
        fullWidth && "w-full",
        danger &&
          "bg-rose-500 text-white hover:bg-rose-600 disabled:hover:bg-rose-500",
        outline && "ring-primaryGreen bg-transparent ring-2 ring-inset",
        autoPadding && "px-4 py-1 md:px-6 md:py-2",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
