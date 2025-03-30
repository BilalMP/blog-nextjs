import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schema";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export default {
    providers: [
        credentials({
            async authorize(credentials) {
                const validatedField = loginSchema.safeParse(credentials);

                if (!validatedField.success) {
                    return null;
                }

                const { email, password } = validatedField.data;

                let user;
                try {
                    user = await prisma.user.findUnique({ where: { email } });
                } catch (error) {
                    return null
                }

                if (!user || !user.password || !user.email) {
                    return null;
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return null;
                }
                return user
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
} satisfies NextAuthConfig
