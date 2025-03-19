"use client";

import PopupAnimate from "@/components/animations/PopupAnimate";
import Avatar from "@/components/Avatar";
import Line from "@/components/Line";
import LogoutConfirm from "@/components/LogoutConfirm";
import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useRoutes } from "@/hooks/useRoutes";
import Link from "next/link";
import { RefObject } from "react";
import { CiLogout } from "react-icons/ci";

interface PopupContentProps {
  isOpen: boolean;
  ref: RefObject<HTMLDivElement | null>;
}

const PopupContent: React.FC<PopupContentProps> = ({ isOpen, ref }) => {
  const { data: userData } = useGetCurrentUser();
  const { router, handleToggleModal, isOpenModal } = useRoutes();

  const logoutItem = router.find((_, idx) => router.length - 1 === idx);

  return (
    <PopupAnimate
      isOpen={isOpen}
      ref={ref}
      originPopup="top-right"
      className="absolute right-4 -bottom-[290px] z-50 min-w-72 rounded-lg border border-neutral-200 bg-white p-3 shadow md:right-0 md:min-w-80"
    >
      <Link
        href={"/dashboard/profile"}
        className="group flex cursor-pointer gap-4 rounded-lg p-2 transition-all duration-300 hover:bg-neutral-200/80"
      >
        <Avatar avatar={userData?.avatar} size="small" />
        <div>
          <h1 className="group-hover:text-primaryGreen font-sans text-lg font-semibold transition-all duration-300 md:text-xl">
            {userData?.username || "Username"}
          </h1>
          <p className="font-sans text-xs text-neutral-700">
            {userData?.email}
          </p>
        </div>
      </Link>
      <Line />
      <div className="flex flex-col gap-1 font-sans">
        {router.slice(0, 3).map((route) => (
          <Link
            key={route.label}
            href={route.url}
            className="hover:text-primaryGreen rounded-lg p-2 transition-all duration-300 hover:bg-neutral-200/80"
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="my-2 w-full border-t border-gray-300" />

      <button
        onClick={handleToggleModal}
        className="hover:text-primaryGreen flex w-full cursor-pointer items-center justify-between rounded-lg p-2 text-start font-sans transition-all duration-300 hover:bg-neutral-200/80"
      >
        {logoutItem?.label}
        <CiLogout size={20} />
      </button>

      <LogoutConfirm isOpen={isOpenModal} onClose={handleToggleModal} />
    </PopupAnimate>
  );
};

export default PopupContent;
