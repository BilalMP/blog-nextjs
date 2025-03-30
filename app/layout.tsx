import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
    title: "Blog App",
    description: "Blog App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <SessionProvider>
                    <Header />
                    <main className="min-h-screen pt-24 pb-16 px-6 md:px-10">
                        {children}
                    </main>
                    <Footer />
                    <Toaster />
                </SessionProvider>
            </body>
        </html>
    );
}
