"use client";

import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="font-montserrat flex h-full flex-col items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-lg flex-col items-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">
          Donasi Tidak Ditemukan
        </h1>
        <p className="mb-6 text-gray-700">
          Maaf, donasi yang Anda cari tidak tersedia atau sudah dihapus.
        </p>
        <Button secondary autoPadding onClick={() => router.back()}>
          Kembali ke Daftar Donasi
        </Button>
      </div>
    </div>
  );
}
