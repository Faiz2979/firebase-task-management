import SidebarWithNavbar from "@/components/SidebarWithNavbar";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Socialize | Chats",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
        className={`antialiased`}
        >
            <SidebarWithNavbar/>
            {children}
        </div>
    );
  }