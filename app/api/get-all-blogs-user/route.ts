import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const session = await auth();

    if (!session) {
        return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const userEmail = session?.user?.email;

    if (!userEmail) {
        return NextResponse.json({ error: "User email not found" }, { status: 400 });
    }

    let userId = "";

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }

        userId = user.id;
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 });
    }

    try {
        const userBlogs = await prisma.post.findMany({
            where: {
                authorId: userId
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

        if (!userBlogs) {
            return NextResponse.json({ error: "Please again later" }, { status: 500 });
        }

        // Transform categories to array of names
        const transformedBlogs = userBlogs.map(blog => ({
            ...blog,
            categories: blog.categories.map(c => c.name),
            date: blog.createdAt.toISOString().split('T')[0]
        }));

        return NextResponse.json(transformedBlogs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Please again later" }, { status: 500 });
    }

}
