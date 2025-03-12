"use client";

import { navigate } from "@/lib/server";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoBookmarksOutline, IoSearchOutline } from "react-icons/io5";
import Search from "./Search";
import Button from "./buttons/Button";
import { useAuth } from "@/context/AuthContext";
import Avatar from "./Avatar";

export const Header = () => {
  const pathname = usePathname();
  const [activeSearch, setActiveSearch] = useState(false);
  const { session, isLoading } = useAuth();

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between bg-white px-5 py-4 shadow-md md:px-0 md:shadow-none">
      <Link href={"/"}>Logo</Link>
      {pathname === "/" && (
        <Search
          withIcon
          className="hidden md:flex"
          onChange={(e) => console.log(e.target.value)}
        />
      )}
      <div className="flex items-center gap-x-3">
        {pathname === "/" ? (
          <div className="flex items-center gap-x-1">
            {activeSearch && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex md:hidden"
              >
                <Search onChange={(e) => console.log(e.target.value)} />
              </motion.div>
            )}
            <IoSearchOutline
              size={23}
              onClick={() => setActiveSearch(!activeSearch)}
              className="block cursor-pointer md:hidden"
            />
          </div>
        ) : (
          <IoBookmarksOutline size={20} className="cursor-pointer" />
        )}

        {isLoading ? (
          <p className="text-xs">waiting...</p>
        ) : session ? (
          <Avatar />
        ) : (
          <Button outline autoPadding onClick={() => navigate("/auth")}>
            Log in
          </Button>
        )}
      </div>
    </div>
  );
};
