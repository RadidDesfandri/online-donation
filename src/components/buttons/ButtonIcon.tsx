import clsx from "clsx";
import { IconType } from "react-icons";

interface ButtonIconProps {
  icon: IconType;
  size?: number;
  rounded?: "xl" | "full";
  variant?: "black" | "green" | "white";
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon: Icon,
  size = 20,
  rounded = "full",
  variant = "black",
}) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center p-[6px] shadow-lg",
        variant === "black" && "bg-[#303030] text-white",
        variant === "white" && "bg-white text-black",
        variant === "green" && "bg-primaryGreen text-white",
        rounded === "xl" && "rounded-xl",
        rounded === "full" && "rounded-full",
      )}
    >
      <Icon size={size} />
    </div>
  );
};

export default ButtonIcon;
