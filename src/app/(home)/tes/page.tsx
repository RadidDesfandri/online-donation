"use client";

import { useSession } from "@/hooks/auth/useSession";

const Pagess = () => {
  const { session } = useSession();

  console.log("ACCESS_TOKEN", session?.access_token);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="w-96">{session?.access_token}</p>
    </div>
  );
};

export default Pagess;
