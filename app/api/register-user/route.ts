import { registerUserSchema } from "@/schema";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const validatedField = registerUserSchema.safeParse(body);

    if (!validatedField.success) {
        return NextResponse.json({ error: validatedField.error.errors }, { status: 400 });
    }

    const { email, name, password, image, role } = validatedField.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                image,
                role
            }
        })
        if (!user) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 })
    }

    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
}