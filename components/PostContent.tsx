"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { renderMarkdown } from "@/lib/markdown";
import Image from "next/image";

interface PostContentProps {
    post: {
        title: string;
        content: string;
        coverImage: string;
        date: string;
        readingTime: string;
        categories: Array<{ name: string }>;
        author: {
            name: string;
            avatar: string;
            bio: string;
        };
    };
}

const PostContent = ({ post }: PostContentProps) => {
    const [renderedContent, setRenderedContent] = useState<string>("");

    useEffect(() => {
        const render = async () => {
            const content = await renderMarkdown(post.content);
            setRenderedContent(content);
        };

        render();
    }, [post]);

    return (
        <article className="max-w-3xl mx-auto px-6 py-8">
            {/* {renderedContent} */}
            <header className="mb-10 space-y-6">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                    {post.title}
                </h1>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {post.readingTime}
                    </span>
                </div>

                {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {post.categories.map((category, index) => (
                            <span
                                key={`${category.name}-${index}`}
                                className="inline-block px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="aspect-[21/9] overflow-hidden rounded-lg">
                    <Image
                        src={
                            post.coverImage ||
                            "https://placehold.co/1200x630?text=Blog+Cover+Image"
                        }
                        alt={post.title}
                        width={1200}
                        height={630}
                        className="rounded-lg mb-8"
                    />
                </div>
            </header>

            <div
                className="blog-content prose prose-quoteless prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
            />

            <div className="mt-16 pt-8 border-t border-border/50">
                <div className="flex items-center space-x-4">
                    <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-12 w-12 rounded-full object-cover"
                        width={500}
                        height={500}
                    />
                    <div>
                        <h3 className="font-semibold">{post.author.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            {post.author.bio}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostContent;
