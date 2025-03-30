"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Account = () => {
    const { data: session } = useSession();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {session?.user
                        ? `Hello, ${
                              session.user.name ||
                              session.user.email?.split("@")[0] ||
                              "User"
                          }`
                        : "Account"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {session?.user ? (
                        <>
                            <DropdownMenuItem>
                                <Link
                                    href={"/dashboard"}
                                    className="text-sm font-medium hover:opacity-70 transition-opacity relative py-1 text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                                >
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={"/add-blog"}
                                    className="text-sm font-medium hover:opacity-70 transition-opacity relative py-1 text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                                >
                                    Add Blog
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>
                                Logout
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem>
                                <Link
                                    href={"/login"}
                                    className="text-sm font-medium hover:opacity-70 transition-opacity relative py-1 text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                                >
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={"/register"}
                                    className="text-sm font-medium hover:opacity-70 transition-opacity relative py-1 text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                                >
                                    Register
                                </Link>
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Account;
