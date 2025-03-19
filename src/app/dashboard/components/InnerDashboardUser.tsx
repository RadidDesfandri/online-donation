"use client";

import { useGetCurrentUser } from "@/hooks/auth/useGetCurrentUser";
import { useSession } from "@/hooks/auth/useSession";
import LoadingSkeletonDashboard from "./LoadingSkeletonDashboard";

const InnerDashboardUser = () => {
  const { session, isLoading } = useSession();
  const { data: userData, isPending } = useGetCurrentUser();

  if (isLoading || isPending) {
    return <LoadingSkeletonDashboard />;
  }

  if (session && userData?.role === "USER") {
    return <div>INNER DASHBOARD USER</div>;
  }
};

export default InnerDashboardUser;
