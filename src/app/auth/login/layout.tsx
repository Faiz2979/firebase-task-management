import { Metadata } from "next";


export const metadata: Metadata = {
    title: "TaskCanvas | Login",
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
            {children}
        </div>
    );
  }