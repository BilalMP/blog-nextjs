import { loginSchema } from "@/schema";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const validatedField = loginSchema.safeParse(body);

    if (!validatedField.success) {
        return NextResponse.json({ error: validatedField.error.errors }, { status: 400 });
    }

    const { email, password } = validatedField.data;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }

    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 });
    }

    try {
        const res = await signIn("credentials", {
            email, password, redirect: false
        })
        if (!res) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 });
        }
    }
    catch {
        return NextResponse.json({ error: "Please again later" }, { status: 500 })
    }
    return NextResponse.json({ message: "Login successful" }, { status: 200 })
}