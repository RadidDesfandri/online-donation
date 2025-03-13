import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <Header />
      {children}
      <Footer />
    </Suspense>
  );
}
