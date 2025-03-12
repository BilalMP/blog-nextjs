"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LinkOptions = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Contact", url: "/contact" },
    { name: "About", url: "/about" },
];

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    
    return (
        <header
            className={cn(
                "fixed top-0 right-0 z-50 transition-all duration-300 px-6 md:px10 py-4 w-full",
                isScrolled
                    ? "backdrop-blur-lg bg-background/70 shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link
                    href={"/"}
                    className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                    Minimal <span className="text-primary/70">Blog</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                    {LinkOptions.map((link) => (
                        <Link
                            key={link.name}
                            href={link.url}
                            className={cn(
                                "text-sm font-medium hover:opacity-70 transition-opacity relative py-1",
                                pathname === link.url
                                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden focus:outline-none"
                    aria-label="Toggle navigation"
                >
                    {mobileMenuOpen ? (
                        <X className="size-6" />
                    ) : (
                        <Menu className="size-6" />
                    )}
                </button>
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg animate-fade-in">
                        <nav className="flex flex-col p-5 space-y-4">
                            {LinkOptions.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    className={cn(
                                        "px-4 py-2 font-medium transition-colors rounded-md",
                                        location.pathname === link.url
                                            ? "bg-secondary text-foreground"
                                            : "text-muted-foreground hover:bg-secondary/50"
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
