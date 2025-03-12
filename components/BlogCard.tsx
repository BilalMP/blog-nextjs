import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface BlogCardProps {
    post: {
        id: string;
        title: string;
        excerpt: string;
        coverImage: string;
        date: string;
        readingTime: string;
        categories: string[];
    };
    className?: string;
}

const BlogCard = ({ post, className }: BlogCardProps) => {
    return (
        <article
            className={cn(
                "group flex flex-col h-full overflow-hidden rounded-lg border border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:border-border",
                className
            )}
        >
            <Link
                href={`/post/${post.id}`}
                className="block overflow-hidden aspect-[16/9]"
            >
                <div className="w-full h-full overflow-hidden">
                    <Image
                        src={post.coverImage}
                        width={500}
                        height={500}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            </Link>

            <div className="flex flex-col flex-grow p-5 space-y-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.date}
                    </span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                </div>

                <Link
                    href={`/post/${post.id}`}
                    className="block"
                >
                    <h3 className="font-display text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                </p>

                {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                        {post.categories.map((category) => (
                            <span
                                key={category}
                                className="inline-block px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default BlogCard;
