import { IconType } from "react-icons";
import Line from "../Line";
import BoxRoutes from "./BoxRoutes";
import HeaderSidebarMenu from "./HeaderSidebarMenu";
import LogoutConfirm from "../LogoutConfirm";

interface HeaderSidebarMenuItems {
  avatar: string;
  isPending: boolean;
  username: string;
  createdAt: string;
}

interface RoutesMenuItems {
  label: string;
  url: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

interface LogoutConfirmItems {
  isOpen: boolean;
  onClose: () => void;
}

interface SidebarContentProps {
  headerItems: HeaderSidebarMenuItems;
  router: RoutesMenuItems[];
  logOutConfirm: LogoutConfirmItems;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  headerItems,
  logOutConfirm,
  router,
}) => {
  return (
    <>
      <HeaderSidebarMenu
        avatar={headerItems.avatar}
        createdAt={headerItems.createdAt}
        isPending={headerItems.isPending}
        username={headerItems.username}
      />

      <Line />
      <p className="font-medium">Umum</p>
      <div className="mt-2 flex flex-col gap-1">
        {router.slice(0, 3).map((route) => (
          <BoxRoutes
            key={route.label}
            active={route.active}
            icon={route.icon}
            label={route.label}
            url={route.url}
          />
        ))}
      </div>
      <p className="mt-3 font-medium">Pengaturan</p>
      <div className="mt-1 flex flex-col gap-1">
        {router.slice(3, 5).map((route) => (
          <BoxRoutes
            onClick={route.onClick}
            key={route.label}
            active={route.active}
            icon={route.icon}
            label={route.label}
            url={route.url}
          />
        ))}
      </div>
      <LogoutConfirm
        isOpen={logOutConfirm.isOpen}
        onClose={logOutConfirm.onClose}
      />
    </>
  );
};

export default SidebarContent;
