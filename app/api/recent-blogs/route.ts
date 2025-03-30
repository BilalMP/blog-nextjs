import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export const GET = async () => {
    try {
        const recentBlogs = await prisma.post.findMany({
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
        })
        if (!recentBlogs) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 })
        }
        return NextResponse.json(recentBlogs, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 })
    }
}