import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";

interface NotifIconProps {
  label?: string;
}

const NotifIcon: React.FC<NotifIconProps> = ({ label }) => {
  return (
    <Link
      href="/dashboard/notif"
      className="flex cursor-pointer items-center gap-2 text-white transition-all duration-300 hover:scale-[102%]"
    >
      <button type="button" className="relative rounded-full bg-[#1C1B1B] p-1">
        <IoMdNotificationsOutline />
        <div className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-[9px]">
          1
        </div>
      </button>
      {label && <span className="text-xs font-medium">{label}</span>}
    </Link>
  );
};

export default NotifIcon;
