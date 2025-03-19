"use client";

import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useRoutes } from "@/hooks/useRoutes";
import { navigate } from "@/lib/server";
import { FiArrowLeft } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import Button from "../buttons/Button";
import SidebarContent from "./SidebarContent";

const AppSidebarDesktop = () => {
  const { router, isOpenModal, handleToggleModal } = useRoutes();
  const { data: userData, isPending } = useGetCurrentUser();

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

  return (
    <div className="fixed top-1/6 left-16 z-50 hidden min-h-72 min-w-56 rounded-xl p-4 shadow md:block">
      <div className="mb-2 flex items-center justify-between">
        <Button
          outline
          type="button"
          rounded="full"
          onClick={() => navigate("/")}
          className="mb-2 p-1 px-2 text-xs text-black"
        >
          Back <FiArrowLeft />
        </Button>
        <IoSunnyOutline
          size={25}
          className="cursor-pointer rounded-full p-1 text-black"
        />
      </div>
      <SidebarContent
        headerItems={headerMenu}
        logOutConfirm={logOutConfirm}
        router={router}
      />
    </div>
  );
};

export default AppSidebarDesktop;
