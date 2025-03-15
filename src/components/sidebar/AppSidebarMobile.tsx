"use client";

import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRoutes } from "@/hooks/useRoutes";
import { useToggle } from "@/hooks/useToggle";
import Link from "next/link";
import { useRef } from "react";
import { MdMenu } from "react-icons/md";
import SlideInAnimate from "../animations/SlideInAnimate";
import SidebarContent from "./SidebarContent";

const AppSidebarMobile = () => {
  const { router, isOpenModal, handleToggleModal } = useRoutes();
  const { data: userData, isPending } = useGetCurrentUser();
  const [isOpenMenu, handleToggleMenu] = useToggle();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const logOutConfirm = {
    isOpen: isOpenModal,
    onClose: handleToggleModal,
  };

  const headerMenu = {
    avatar: userData?.avatar || "",
    isPending,
    username: userData?.username || "",
    createdAt: userData?.createdAt || "",
  };

  useClickOutside([menuRef], handleToggleMenu, isOpenMenu);
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between bg-white px-5 py-3 shadow md:hidden">
      <Link href={"/"}>Logo</Link>
      <button onClick={handleToggleMenu} className="cursor-pointer">
        <MdMenu size={22} />
      </button>

      <SlideInAnimate
        ref={menuRef}
        isOpen={isOpenMenu}
        position="right"
        width="large"
        className="p-5"
      >
        <SidebarContent
          headerItems={headerMenu}
          logOutConfirm={logOutConfirm}
          router={router}
        />
      </SlideInAnimate>
    </div>
  );
};

export default AppSidebarMobile;
