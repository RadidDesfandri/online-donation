import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";

type OriginType =
  | "center"
  | "center-right"
  | "center-left"
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

interface PopupAnimateProps {
  children: React.ReactNode;
  isOpen: boolean;
  originPopup?: OriginType;
  className?: string;
  duration?: number;
}

const getTransformOrigin = (origin: OriginType) => {
  switch (origin) {
    case "top-right":
      return "top right";
    case "top-left":
      return "top left";
    case "bottom-right":
      return "bottom right";
    case "bottom-left":
      return "bottom left";
    case "center-right":
      return "center right";
    case "center-left":
      return "center left";
    case "center":
    default:
      return "center";
  }
};

const PopupAnimate = forwardRef<HTMLDivElement, PopupAnimateProps>(
  (
    { children, isOpen, originPopup = "top-right", className, duration = 0.3 },
    ref,
  ) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{
              opacity: 0,
              scale: 0,
              transformOrigin: getTransformOrigin(originPopup),
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transformOrigin: getTransformOrigin(originPopup),
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transformOrigin: getTransformOrigin(originPopup),
            }}
            transition={{ duration, ease: "easeInOut" }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

PopupAnimate.displayName = "PopupAnimate";

export default PopupAnimate;
