"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animation?:
    | "fade"
    | "slide-top"
    | "slide-bottom"
    | "slide-left"
    | "slide-right";
  className?: string;
  disableScroll?: boolean;
  padded?: boolean;
};

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-top": {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "slide-bottom": {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "slide-left": {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "slide-right": {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: "0%", opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  animation = "fade",
  className,
  disableScroll = false,
  padded,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen && disableScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, disableScroll]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 md:px-0"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants[animation]}
            transition={{ duration: 0.3 }}
            className={clsx(
              "relative w-full max-w-lg rounded-lg bg-neutral-950 text-white shadow-lg",
              padded && "p-6",
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <IoClose size={20} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
