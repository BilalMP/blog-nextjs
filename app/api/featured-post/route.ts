import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        const featuredPost = await prisma.post.findFirst({
            orderBy: {
                createdAt: "desc" 
            },
            include: {
                author: true,
                categories: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (!featuredPost) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 })
        }
        return NextResponse.json(featuredPost, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 })
    }
}