"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";

interface Blog {
    id: string;
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
}

const RecentsPosts = () => {
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch("/api/recent-blogs");
            const data = await response.json();
            console.log("posts", data);

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch blogs");
            }

            if (!Array.isArray(data)) {
                throw new Error(
                    "Invalid data format: expected an array of blogs"
                );
            }

            setRecentBlogs(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                    {recentBlogs.map((post: any) => (
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
