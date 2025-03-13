"use client";

import PopupContent from "@/app/(home)/components/PopupContent";
import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useSession } from "@/hooks/auth/useSession";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useToggle } from "@/hooks/useToggle";
import { navigate } from "@/lib/server";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { IoBookmarksOutline, IoSearchOutline } from "react-icons/io5";
import Avatar from "./Avatar";
import Search from "./Search";
import PopupAnimate from "./animations/PopupAnimate";
import Button from "./buttons/Button";
import clsx from "clsx";

export const Header = () => {
  const pathname = usePathname();

  const { session, isLoading } = useSession();
  const { data: userData } = useGetCurrentUser();

  const [openSearch, toggleSearch] = useToggle();
  const [openAvatar, toggleAvatar] = useToggle();

  const searchRef = useRef<HTMLDivElement | null>(null);
  const iconSearchRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useClickOutside([searchRef, iconSearchRef], toggleSearch, openSearch);
  useClickOutside([avatarRef, popupRef], toggleAvatar, openAvatar);

  return (
    <div
      className={clsx(
        "relative mx-auto flex w-full max-w-5xl items-center bg-white px-5 py-4 shadow-md md:px-0 md:shadow-none",
        openSearch ? "justify-end" : "justify-between",
      )}
    >
      <Link
        href={"/"}
        className={clsx(
          "font-robotoslab transition-all duration-300",
          openSearch ? "hidden md:block" : "block",
        )}
      >
        Logo
      </Link>

      {pathname === "/" && <Search withIcon className="hidden md:flex" />}

      <div
        className={clsx(
          "flex items-center gap-x-3",
          openSearch && "w-full justify-end md:w-fit md:justify-normal",
        )}
      >
        {pathname === "/" ? (
          <div
            className={clsx(
              "flex items-center gap-x-2",
              openSearch && "w-full justify-between",
              openSearch && session ? "max-w-[320px]" : "max-w-[285px]",
            )}
          >
            <PopupAnimate
              ref={searchRef}
              isOpen={openSearch}
              className="flex w-full md:hidden"
              originPopup="center-right"
            >
              <Search autoFocus />
            </PopupAnimate>

            <div ref={iconSearchRef} onClick={toggleSearch}>
              <IoSearchOutline
                size={23}
                className="block cursor-pointer md:hidden"
              />
            </div>
          </div>
        ) : (
          <IoBookmarksOutline size={20} className="cursor-pointer" />
        )}

        {isLoading ? (
          <p className="text-xs">waiting...</p>
        ) : session ? (
          <div onClick={toggleAvatar} ref={avatarRef}>
            <Avatar ringOnHover avatar={userData?.avatar} />
          </div>
        ) : (
          <Button outline autoPadding onClick={() => navigate("/auth")}>
            Log in
          </Button>
        )}
      </div>

      <PopupContent isOpen={openAvatar} ref={popupRef} />
    </div>
  );
};
