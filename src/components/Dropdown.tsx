"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import clsx from "clsx";
import { useField } from "formik";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface DropdownProps {
  name?: string;
  options: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  variant?: "primary" | "secondary";
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function Dropdown({
  name,
  options,
  label,
  placeholder = "Select an option",
  variant = "primary",
  value: propValue,
  onChange,
  disabled,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [localValue, setLocalValue] = useState<string | undefined>(propValue);

  const [field, meta, helpers] = name
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useField(name)
    : [
        { value: localValue },
        { touched: false, error: undefined },
        { setValue: () => {} },
      ];

  useEffect(() => {
    if (!name) {
      setLocalValue(propValue);
    }
  }, [propValue, name]);

  useClickOutside([ref], () => setIsOpen(false), isOpen);

  const variants = {
    primary: " bg-primaryGreen/20 mb-1 w-full rounded-lg px-4 py-3 text-sm",
    secondary: "border-gray-500 border focus:ring-gray-300",
  };

  const displayValue = field.value
    ? options.find((opt) => opt.value === field.value)?.label
    : placeholder;

  const handleSelect = (selectedValue: string) => {
    if (name) {
      helpers.setValue(selectedValue);
    } else {
      setLocalValue(selectedValue);
      onChange?.(selectedValue);
    }
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (disabled) {
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative w-full" ref={ref}>
      {label && (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}
      <div
        onClick={handleOpen}
        className={clsx(
          "flex items-center justify-between rounded-md p-2 transition-all duration-300 focus:ring-2 focus:outline-none",
          disabled ? "cursor-default opacity-55" : "cursor-pointer",
          placeholder && !field.value && "text-gray-500",
          variants[variant],
        )}
      >
        <span>{displayValue}</span> {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      <motion.ul
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -5 }}
        transition={{ duration: 0.2 }}
        className={clsx(
          "absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg",
          isOpen ? "block" : "hidden",
        )}
      >
        {options.map((option) => (
          <li
            key={option.value}
            className="cursor-pointer rounded-md p-2 hover:bg-gray-100"
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </motion.ul>
      {name && meta.touched && meta.error && (
        <p className="text-[11px] text-red-500">{meta.error}</p>
      )}
    </div>
  );
}
