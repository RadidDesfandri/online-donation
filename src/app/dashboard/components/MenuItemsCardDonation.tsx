"use client";

import PopupAnimate from "@/components/animations/PopupAnimate";
import { useRouter } from "next/navigation";
import React, { RefObject } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

interface MenuItemsCardDonationProps {
  id: string;
  isOpen: boolean;
  ref: RefObject<HTMLDivElement | null>;
  handleOpenModalDelete: () => void;
}

const MenuItemsCardDonation: React.FC<MenuItemsCardDonationProps> = ({
  isOpen,
  ref,
  id,
  handleOpenModalDelete,
}) => {
  const router = useRouter();
  return (
    <PopupAnimate
      ref={ref}
      isOpen={isOpen}
      originPopup="top-right"
      className="absolute top-8 right-2 z-10 rounded-md bg-white p-3 shadow-lg"
    >
      <div className="flex min-w-35 flex-col gap-2">
        <button
          type="button"
          onClick={() => router.push(`/dashboard/edit/${id}`)}
          className="hover:bg-primaryGreen flex w-full cursor-pointer items-center gap-4 rounded-lg bg-gray-200 px-2 py-2 transition-all duration-300 hover:text-white"
        >
          <FaRegEdit /> Edit
        </button>
        <button
          type="button"
          onClick={handleOpenModalDelete}
          className="flex w-full cursor-pointer items-center gap-4 rounded-lg bg-gray-200 px-2 py-2 transition-all duration-300 hover:bg-red-700 hover:text-white"
        >
          <AiOutlineDelete /> Delete
        </button>
      </div>
    </PopupAnimate>
  );
};

export default MenuItemsCardDonation;
