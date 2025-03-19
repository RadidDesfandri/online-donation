import AppSidebarDesktop from "@/components/sidebar/AppSidebarDesktop";
import AppSidebarMobile from "@/components/sidebar/AppSidebarMobile";
import HeaderDashboardDesktop from "@/components/sidebar/HeaderDashboardDesktop";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-full w-full">
      <AppSidebarDesktop />
      <AppSidebarMobile />
      <div className="px-5 pt-14 pb-5 md:pt-5 md:pr-20 md:pl-80">
        <HeaderDashboardDesktop />
        <div className="md:pt-10">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
