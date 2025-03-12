import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";

const RecentsPosts = () => {
    return (
        <section className="py-10 md:py-16 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="font-bold text-2xl md:text-3xl">
                        Recent Posts
                    </h2>
                    <Link
                        href={"/blog"}
                        className="flex items-center justify-center text-primary"
                    >
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {RecentsPostsData.map((post: any) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentsPosts;

const RecentsPostsData = [
    {
        id: "1",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Category 1", "Category 2"],
    },
    {
        id: "2",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Category 1", "Category 2"],
    },
    {
        id: "3",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Category 1", "Category 2"],
    },
];
