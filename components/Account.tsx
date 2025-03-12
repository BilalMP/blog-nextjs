import { auth } from "@/auth";
import Link from "next/link";

const Account = async () => {
    const session = await auth();
    if (!session?.user)
        return (
            <div>
                <Link
                    href={"/login"}
                    className="text-sm font-medium hover:opacity-70 transition-opacity relative py-1 text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                >
                    Login
                </Link>
                <Link
                    href={"/register"}
                    className="text-sm font-medium hover:opacity-70 transition-opacity relative py-1 text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-foreground"
                >
                    Register
                </Link>
            </div>
        );
    
};

export default Account;