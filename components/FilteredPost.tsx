import React from "react";
import BlogCard from "./BlogCard";

const FilteredPost = () => {
    return (
        <div className="py-10 md:py-16 px-6 md:px-10">
            {filterPostData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filterPostData.map((post) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        No posts found matching your criteria.
                    </p>
                </div>
            )}
        </div>
    );
};

export default FilteredPost;

const filterPostData = [
    {
        id: "1",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Nextjs", "Prisma"],
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
        categories: ["Nextjs", "Prisma"],
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
        categories: ["Nextjs", "Prisma"],
    },
    {
        id: "4",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Nextjs", "Prisma"],
    },
    {
        id: "5",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Nextjs", "Prisma"],
    },
    {
        id: "6",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Nextjs", "Prisma"],
    },
    {
        id: "7",
        title: "Getting Started with Next.js and Prisma",
        excerpt:
            "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
        coverImage:
            "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        date: "April 12, 2023",
        readingTime: "5 min read",
        categories: ["Nextjs", "Prisma"],
    },
];
