"use client";

import clsx from "clsx";
import { useField } from "formik";
import { useEffect, useState } from "react";

interface InputRupiahProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

export const InputRupiah: React.FC<InputRupiahProps> = ({
  name,
  label,
  error,
  disabled,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (!field.value) {
      setDisplayValue("");
    } else {
      setDisplayValue(formatRupiah(field.value.toString()));
    }
  }, [field.value]);

  const formatRupiah = (value: string) => {
    const number = parseInt(value.replace(/\D/g, "")) || 0;
    return `Rp.${number.toLocaleString("id-ID")}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    helpers.setValue(rawValue);
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={displayValue}
        disabled={disabled}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        className={clsx(
          "disabled:hover:ring-primaryGreen bg-primaryGreen/20 mb-1 w-full rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none placeholder:text-sm focus:ring-1",
          disabled && "opacity-55",
          error
            ? "ring-rose-500 ring-offset-rose-500"
            : "hover:ring-primaryGreen focus:ring-primaryGreen placeholder:text-gray-500",
        )}
      />
      {meta.touched && meta.error && (
        <p className="text-[11px] text-red-500">{meta.error}</p>
      )}
    </div>
  );
};
