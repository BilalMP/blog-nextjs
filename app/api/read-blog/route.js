import prisma from "@/database/prisma";
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Id is required", status: 400, success: false });
        }
        const blog = await prisma.blog.findUnique({
            where: {
                id
            }
        })
        prisma.$disconnect()
        if (blog) {
            return NextResponse.json({ message: "Blog fetched successfully", status: 200, success: true, blog });
        } else {
            return NextResponse.json({ message: "Blog not found", success: false, status: 400 })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, status: 500, sucess: false })
    }
}