import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { blogSchema } from "@/schema";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
    const session = await auth();
    console.log("Session:", session);

    if (!session) {
        console.error("Unauthorized: No session or missing user information.");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request Body:", body);

    const validatedField = blogSchema.safeParse(body);

    if (!validatedField.success) {
        console.error("Validation Error:", validatedField.error.errors);
        return NextResponse.json(
            { error: validatedField.error.errors },
            { status: 400 }
        );
    }

    const {
        title,
        excerpt,
        content,
        coverImage,
        readingTime,
        categories,
    } = validatedField.data;

    console.log("Title: " + title);
    console.log("Excerpt: " + excerpt);
    console.log("Content: " + content);
    console.log("Cover Image: " + coverImage);
    console.log("Reading Time: " + readingTime);
    console.log("Categories: " + categories);

    const userEmail = session?.user?.email;
    console.log("user email addresss " + userEmail)
    let userId = "";
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail as string,
            },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        userId = user.id
        console.log("user id " + userId)
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 })
    }

    try {
        const post = await prisma.post.create({
            data: {
                title,
                excerpt,
                content,
                coverImage,
                readingTime,
                categories,
                authorId: userId,
            },
        });

        if (!post) {
            console.error("Prisma Error: Failed to create post");
            return NextResponse.json(
                { error: "Failed to create post" },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Post created successfully", post },
            { status: 201 }
        );
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { error: "An error occurred while creating the post" },
            { status: 500 }
        );
    }
};
