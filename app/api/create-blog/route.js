import prisma from "@/database/prisma";
import Joi from "joi";
import { NextResponse } from "next/server";

const CreateBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
})

export async function POST(request) {
    try {
        const blog = await request.json();
        const { title, description } = blog;
        const { error } = CreateBlog.validate(blog);
        if (error) {
            return NextResponse.json({ message: error.message, status: 400, success: false });
        }
        const newBlog = await prisma.blog.create({
            data: {
                title,
                description
            }
        })
        prisma.$disconnect()
        if (newBlog) {
            return NextResponse.json({ message: "Blog created successfully", status: 200, success: true, newBlog });
        } else {
            return NextResponse.json({message: "Blog not created", status: 400, success: false});
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, status: 500, success: false });
    }
}