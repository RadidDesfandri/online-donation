"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoBookmarksOutline, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Search from "./Search";
import Button from "./buttons/Button";
import { motion } from "framer-motion";

export const Header = () => {
  const pathname = usePathname();
  const [activeSearch, setActiveSearch] = useState(false);
  const router = useRouter();

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
        {pathname === "/" && (
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
        )}
        {pathname !== "/" && (
          <IoBookmarksOutline size={20} className="cursor-pointer" />
        )}
        <Button
          outline
          autoPadding
          onClick={() => router.push("/auth?role=user")}
        >
          Log in
        </Button>
        {/* <Avatar avatar="https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg?uid=R81763287&ga=GA1.1.1155690026.1729800077&semt=ais_hybrid" /> */}
      </div>
    </div>
  );
};
