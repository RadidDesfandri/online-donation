import clsx from "clsx";
import Image from "next/image";

interface BoxFilterProps {
  isActive?: boolean;
  label: string;
  image: string;
  onClick: () => void;
}

const BoxFilter: React.FC<BoxFilterProps> = ({
  isActive,
  label,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex min-h-24 min-w-24 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-[0.5px] bg-white px-4 shadow-md transition-all duration-300 ease-in-out md:max-h-16 md:min-h-16 md:min-w-28 md:flex-row md:px-5",
        isActive && "scale-105 ring-2 ring-black",
      )}
    >
      <Image
        width={70}
        height={70}
        alt="Filter image"
        src={image}
        className="md:max-w-w-1/3"
      />
      <p className="text-center text-sm text-wrap">{label}</p>
    </div>
  );
};

export default BoxFilter;
