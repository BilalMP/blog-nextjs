import prisma from "@/database/prisma";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ message: "Id is required", status: 400, sucess: false })
        }
        const { title, description } = await request.json();
        const { error } = EditBlog.validate({ title, description });
        if (error) {
            return NextResponse.json({ message: error.message, status: 400, success: false })
        }
        const updatedBlog = await prisma.blog.update({
            where: {
                id
            },
            data: {
                title,
                description
            }
        })
        prisma.$disconnect()
        if (updatedBlog) {
            return NextResponse.json({ message: "Blog updated sucessfully", status: 200, success: true })
        } else {
            return NextResponse.json({ message: "blogs not updated", status: 400, success: false })
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, status: 400, success: false })
    }
}