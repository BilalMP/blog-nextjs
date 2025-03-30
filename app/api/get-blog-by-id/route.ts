import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const {postId} = body;
    
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: true,
                categories: {
                    select: {
                        name: true
                    }
                }
            },
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Transform response to match frontend expectations
        const responseData = {
            ...post,
            coverImage: post.coverImage || '/default-cover.jpg',
            categories: post.categories.map(c => ({ name: c.name })),
            author: {
                name: post.author.name,
                avatar: post.author.image // Ensure this matches your Prisma schema field name
            }
        };

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}
