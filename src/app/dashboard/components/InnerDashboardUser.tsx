"use client";

import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useSession } from "@/hooks/auth/useSession";

const InnerDashboardUser = () => {
  const { session, isLoading } = useSession();
  const { data: userData } = useGetCurrentUser();

  if (isLoading) {
    return <div>LOADING....</div>;
  }

  if (session && userData?.role === "USER") {
    return <div>INNER DASHBOARD USER</div>;
  }
};

export default InnerDashboardUser;
