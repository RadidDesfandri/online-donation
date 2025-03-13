import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { CiLogout } from "react-icons/ci";
import { FiInbox } from "react-icons/fi";
import { RiHome9Line } from "react-icons/ri";
import { useToggle } from "./useToggle";

export const useRoutes = () => {
  const pathname = usePathname();

  const [isOpenModal, handleToggleModal] = useToggle();

  const router = useMemo(
    () => [
      {
        label: "Keranjang",
        url: "/dashboard/keranjang",
        icon: FiInbox,
        active: pathname == "/dashboard/keranjang",
        // onClick: toggleSidebar,
      },
      {
        label: "Transaksi",
        url: "/dashboard/transaction",
        icon: FiInbox,
        active: pathname == "/dashboard/transaction",
        // onClick: toggleSidebar,
      },
      {
        label: "Profile",
        url: "/dashboard/profile",
        icon: RiHome9Line,
        active: pathname == "/dashboard/profile",
        // onClick: toggleSidebar,
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
