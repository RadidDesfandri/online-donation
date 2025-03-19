"use client";

import { IoCreateOutline } from "react-icons/io5";
import Button from "../buttons/Button";
import ClockIcon from "../icons/ClockIcon";
import NotifIcon from "../icons/NotifIcon";
import { useSession } from "@/hooks/auth/useSession";
import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import clsx from "clsx";
import { useRouter } from "next/navigation";

const HeaderDashboardDesktop = () => {
  const { session } = useSession();
  const { data: userData } = useGetCurrentUser();
  const router = useRouter();

  return (
    <header
      className={clsx(
        "bg-secondaryGreen sticky top-5 z-50 hidden items-center rounded-full p-2 px-5 text-white md:flex",
        session && userData?.role === "PROVIDER"
          ? "justify-between"
          : "justify-end",
      )}
    >
      {session && userData?.role === "PROVIDER" && (
        <Button
          rounded="full"
          onClick={() => router.push("/dashboard/create")}
          className="bg-[#1C1B1B] p-1 px-3 font-sans text-xs font-medium"
        >
          <IoCreateOutline size={15} />
          <span>Buat donation</span>
        </Button>
      )}
      <div className="flex items-center gap-5">
        <NotifIcon label="Notifikasi" />
        <ClockIcon />
      </div>
    </header>
  );
};

export default HeaderDashboardDesktop;
