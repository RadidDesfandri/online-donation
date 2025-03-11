"use client";

import Button from "@/components/buttons/Button";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import AuthForm from "./AuthForm";

type VariantAuth = "LOGIN" | "REGISTER";

const AuthInner = () => {
  const [variantAuth, setVariantAuth] = useState<VariantAuth>("LOGIN");
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  const handleToggleVariantAuth = () => {
    setVariantAuth((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      layout
      className={clsx(
        "ring-secondaryGreen flex min-h-[530px] min-w-3xl justify-between rounded-xl p-3 shadow ring-2",
        variantAuth === "LOGIN" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <motion.div
        layout
        className="flex w-full flex-col justify-center rounded-lg md:px-12"
      >
        <h1 className="text-3xl font-medium text-neutral-900 md:text-4xl">
          {variantAuth === "LOGIN" ? "Masuk ke akunmu" : "Buat akun"}
        </h1>
        <div className="pt-2 pb-3 text-start text-xs text-neutral-800">
          {variantAuth === "LOGIN" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <span
            onClick={handleToggleVariantAuth}
            className="cursor-pointer underline"
          >
            {variantAuth === "LOGIN" ? "Buat akun" : "Masuk"}
          </span>
        </div>

        <AuthForm variantAuth={variantAuth} />
      </motion.div>
      <motion.div
        layout
        className="relative hidden w-full overflow-hidden rounded-xl bg-gray-700 md:block"
      >
        <Image
          src="/dummy/dummy2.jpg"
          alt="Image"
          width={500}
          height={500}
          priority
          className="h-full w-[350px] object-cover"
        />
        <div className="absolute top-3 z-10 flex w-full justify-between px-4">
          <p className="text-white">Logo</p>
          <Button
            type="button"
            outline
            rounded="full"
            onClick={() => router.back()}
            className="px-2 text-white"
          >
            Back to website <FiArrowRight />
          </Button>
        </div>
        <div className="absolute top-0 z-0 h-full w-full bg-neutral-900/40" />
      </motion.div>
    </motion.div>
  );
};

export default AuthInner;
