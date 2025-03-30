import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const blogs = await prisma.post.findMany({
            include: {
                author: true,
                categories: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!blogs) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 })
        }
        return NextResponse.json(blogs, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 })
    }
}