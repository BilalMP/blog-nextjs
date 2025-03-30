"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BlogCard from "./BlogCard";

interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readingTime: string;
    categories: string[];
}

const UserDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch("/api/get-all-blogs-user");
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

            setBlogs(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        if (status === "authenticated") {
            fetchData();
        }
    }, [status, router, fetchData]);

    if (status === "loading" || loading) {
        return <p>Loading blogs...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-4xl mb-10 md:text-5xl lg:text-6xl tracking-tight text-balance text-center mt-10 md:mt-12 lg:mt-16">
                All your Blogs
            </h1>
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            post={blog}
                        />
                    ))}
                </div>
            ) : (
                <p>You haven't created any blogs yet.</p>
            )}
        </div>
    );
};

export default UserDashboard;
