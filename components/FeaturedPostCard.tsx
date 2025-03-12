import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedPostCardProps {
    post: {
        id: string;
        title: string;
        excerpt: string;
        coverImage: string;
        date: string;
        readingTime: string;
        categories: string[];
    };
}

const FeaturedPostCard = ({ post }: FeaturedPostCardProps) => {
    return (
        <article className="relative overflow-hidden group rounded-xl bg-card border border-border/50 shadow-sm">
            <div className="grid md:grid-cols-2 h-full">
                <div className="order-2 md:order-1 p-6 md:p-10 flex flex-col justify-center">
                    <div className="space-y-2 md:space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                {post.date}
                            </span>
                            <span>.</span>
                            <span>{post.readingTime}</span>
                        </div>
                        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight">
                            {post.title}
                        </h2>
                        <p className="text-muted-foreground text-pretty mg:text-lg leading-relaxed">
                            {post.excerpt}
                        </p>
                        <div className="pt-4">
                            <Link
                                href={`/blog/${post.id}`}
                                className="inline-flex items-center fontmedium text-primary hover:underline"
                            >
                                Read Article
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 aspect-[16/10] md:aspect-auto overflow-hidden">
                    <div className="w-full h-full overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default FeaturedPostCard;
