import { contactSchema } from "@/schema";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";


export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const validatedField = contactSchema.safeParse(body);

    if (!validatedField.success) {
        return NextResponse.json({ error: validatedField.error.errors }, { status: 400 });
    }

    const { email, name, subject, message } = validatedField.data;
    try {
        const contact = await prisma.contact.create({
            data: {
                email,
                name,
                subject,
                message
            }
        })
        if (!contact) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 })
        }
        return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 });
    }
}