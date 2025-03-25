"use client";

import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="font-montserrat flex h-full w-full flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold">Route tidak ditemukan</h1>
      <Button
        secondary
        autoPadding
        className="mt-4"
        onClick={() => router.push("/")}
      >
        Kembali ke home
      </Button>
    </div>
  );
};

export default NotFound;
