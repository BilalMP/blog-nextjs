import { newsletterSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const validatedField = newsletterSchema.safeParse(body);

    if (!validatedField.success) {
        return NextResponse.json({ error: validatedField.error.errors }, { status: 400 });
    }

    const { email } = validatedField.data;

    try {
        const existingEmail = await prisma.newsletter.findUnique({
            where: {
                email
            }
        })

        if (existingEmail) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 });
    }

    try {
        const newsletter = await prisma.newsletter.create({
            data: {
                email
            }
        })
        if (!newsletter) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 });
        }
        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 });
    }
}