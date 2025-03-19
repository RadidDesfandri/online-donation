"use client";

import { useToast } from "@/context/ToastContext";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { BiError } from "react-icons/bi";
import { MdInfo } from "react-icons/md";

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-center justify-center space-y-2">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: toasts.length - 1 === index ? 1 : 0.5,
              scale: toasts.length - 1 === index ? 1 : 0.95,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={clsx(
              "relative flex w-auto max-w-sm items-center justify-between gap-2 rounded-xl px-6 py-2 text-sm text-white transition-all",
              toast.type === "success"
                ? "bg-black/60 shadow-lg backdrop-brightness-50"
                : toast.type === "error"
                  ? "bg-red-900"
                  : "bg-gray-800",
            )}
          >
            {toast.type === "error" ? (
              <BiError />
            ) : toast.type === "info" ? (
              <MdInfo />
            ) : null}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
