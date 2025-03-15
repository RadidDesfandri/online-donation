import AppSidebarDesktop from "@/components/sidebar/AppSidebarDesktop";
import AppSidebarMobile from "@/components/sidebar/AppSidebarMobile";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-full w-full">
      <AppSidebarDesktop />
      <AppSidebarMobile />
      <div className="h-full px-5 pt-14 md:pt-8 md:pr-20 md:pl-80">
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
