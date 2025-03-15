import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface BoxRoutesProps {
  url: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

const BoxRoutes: React.FC<BoxRoutesProps> = ({
  url,
  active,
  label,
  onClick,
  icon: Icon,
}) => {
  return (
    <Link
      href={url}
      onClick={onClick}
      className={clsx(
        "flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-all duration-300",
        active
          ? "bg-secondaryGreen text-white"
          : "text-black hover:bg-gray-100 hover:pl-4",
      )}
    >
      <Icon />
      {label}
    </Link>
  );
};

export default BoxRoutes;
