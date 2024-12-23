import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Id is required", status: 400, success: false });
        }
        const deleteBlog = await prisma.blog.delete({
            where: {
                id
            }
        })
        prisma.$disconnect()
        if (deleteBlog) {
            return NextResponse.json({ message: "Blog deleted successfully", status: 200, success: true, deleteBlog });
        } else {
            return NextResponse.json({ message: "Blog not found", status: 404, success: false });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, status: 500, success: false });
    }
}