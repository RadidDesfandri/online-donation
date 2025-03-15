import React from "react";
import Avatar from "../Avatar";
import { getFirstLetterUsername } from "@/lib/getFirstLetterUsername";
import { convertDate } from "@/lib/dateConvert";

interface HeaderSidebarMenuProps {
  avatar: string;
  isPending: boolean;
  username: string;
  createdAt: string;
}

const HeaderSidebarMenu: React.FC<HeaderSidebarMenuProps> = ({
  avatar,
  isPending,
  username,
  createdAt,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="small" ringOnHover avatar={avatar} />
      <div>
        <h1 className="font-semibold">
          Hallo{" "}
          {isPending ? "..." : <span>{getFirstLetterUsername(username)}</span>}
          👋
        </h1>
        <p className="text-xs">
          Bergabung pada{" "}
          {isPending ? "..." : <span>{convertDate(createdAt)}</span>}
        </p>
      </div>
    </div>
  );
};

export default HeaderSidebarMenu;
