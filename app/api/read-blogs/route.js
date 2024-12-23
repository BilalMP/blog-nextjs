import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany();
        prisma.$disconnect()
        return NextResponse.json({message:"Blogs fetched successfully", success:true, status:200, blogs})
    } catch (error) {
        return NextResponse.json({message:error.message, success:false, status:500})
    }
}