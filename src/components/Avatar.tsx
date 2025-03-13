import clsx from "clsx";
import Image from "next/image";

interface AvatarProps {
  avatar?: string;
  onClick?: () => void;
  ringOnHover?: boolean;
  size?: "small" | "medium" | "large";
}

const Avatar: React.FC<AvatarProps> = ({
  avatar,
  onClick,
  ringOnHover,
  size = "medium",
}) => {
  return (
    <Image
      width={100}
      height={100}
      alt="Avatar image"
      onClick={onClick}
      className={clsx(
        "cursor-pointer rounded-full object-cover ring-2 ring-neutral-300 transition-all duration-300",
        ringOnHover && "hover:ring-4",
        size === "small" && "h-8 w-8",
        size === "medium" && "h-9 w-9 md:h-11 md:w-11",
        size === "large" && "h-11 w-11 md:h-14 md:w-14",
      )}
      src={avatar || "/home/profileplaceholder.png"}
    />
  );
};

export default Avatar;
