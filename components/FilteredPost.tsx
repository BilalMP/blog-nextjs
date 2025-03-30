"use client";

import { useCallback, useEffect, useState } from "react";
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

const FilteredPost = () => {
    const [filterPostData, setFilterPostData] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch("/api/get-all-blogs");
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

            setFilterPostData(data);
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
