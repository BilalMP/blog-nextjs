import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    return;
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};