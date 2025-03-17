"use client";

import { ErrorMessage, Field } from "formik";
import clsx from "clsx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

interface InputProps {
  type: string;
  name: string;
  id?: string;
  label?: string;
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  id,
  label,
  children,
  error,
  disabled,
  placeholder,
  autoComplete,
  className,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isTypeShowPassword = showPassword ? "text" : "password";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className={clsx(type === "password" && "relative")}>
        <Field
          id={id}
          type={type == "password" ? isTypeShowPassword : type}
          name={name}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={clsx(
            `disabled:hover:ring-primaryGreen bg-primaryGreen/20 mb-1 w-full rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none placeholder:text-sm focus:ring-1`,
            disabled && "opacity-55",
            error
              ? "ring-rose-500 ring-offset-rose-500"
              : "hover:ring-primaryGreen focus:ring-primaryGreen placeholder:text-gray-500",
            className,
          )}
        >
          {children}
        </Field>
        {type == "password" && (
          <button
            onClick={() => setShowPassword!(!showPassword)}
            type="button"
            className="absolute top-[30%] right-3 cursor-pointer text-neutral-700"
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        )}
      </div>
      {error && (
        <ErrorMessage
          name={name}
          component={"div"}
          className="text-[11px] text-red-500"
        />
      )}
    </div>
  );
};

export default Input;
