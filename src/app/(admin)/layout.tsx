import type { Metadata } from "next";
import Sidebar from "@/components/sideBar/Sidebar";
import PrivateRouteClient from "../utils/PrivateRouteClient";

export const metadata: Metadata = {
  title: "Chat WS",
  description: "chat WS app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />
      <section className="ml-[7.5rem]">
        <PrivateRouteClient>{children}</PrivateRouteClient>
      </section>
    </main>
  );
}
