"use client";

import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useSession } from "@/hooks/auth/useSession";

const InnerDashboardProvider = () => {
  const { session } = useSession();
  const { data: userData } = useGetCurrentUser();

  if (session && userData?.role === "PROVIDER") {
    return (
      <div>
        <h1>Tittle</h1>
        <div className="grid grid-cols-4 grid-rows-4 gap-4 bg-gray-950">
          <div className="col-span-2 row-span-2 min-h-96 bg-gray-500 text-center text-white">
            CHART PIE
          </div>
          <div className="col-span-2 col-start-3 row-span-2 min-h-96 bg-gray-500 text-center text-white">
            CHART BATANG
          </div>
          <div className="col-span-4 row-span-2 row-start-3 min-h-96 bg-gray-500 text-center text-white">
            ANY KONTENT
          </div>
        </div>
      </div>
    );
  }
};

export default InnerDashboardProvider;
