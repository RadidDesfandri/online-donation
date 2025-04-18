import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { CiLogout } from "react-icons/ci";
import { FiInbox } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { RiHome9Line } from "react-icons/ri";
import { useToggle } from "./useToggle";
import { LuLayoutDashboard } from "react-icons/lu";

export const useRoutes = () => {
  const pathname = usePathname();

  const [isOpenModal, handleToggleModal] = useToggle();

  const router = useMemo(
    () => [
      {
        label: "Dashboard",
        url: "/dashboard",
        icon: LuLayoutDashboard,
        active: pathname == "/dashboard" || pathname === "/dashboard/create",
      },
      {
        label: "Keranjang",
        url: "/dashboard/cart",
        icon: IoCartOutline,
        active: pathname == "/dashboard/cart",
      },
      {
        label: "Transaksi",
        url: "/dashboard/transaction",
        icon: FiInbox,
        active: pathname == "/dashboard/transaction",
      },
      {
        label: "Profile",
        url: "/dashboard/profile",
        icon: RiHome9Line,
        active: pathname == "/dashboard/profile",
      },
      {
        label: "Logout",
        url: "#",
        icon: CiLogout,
        onClick: handleToggleModal,
      },
    ],
    [pathname, handleToggleModal],
  );

  return { router, isOpenModal, handleToggleModal };
};
