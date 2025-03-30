"use client";

import { useEffect, useState } from "react";
import FeaturedPostCard from "./FeaturedPostCard";

interface FeaturedPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    createdAt: string;
    readingTime: string;
    categories: Array<{ name: string }>;
    author: {
        id: string;
        name: string;
        image: string;
        role: string;
        email: string;
        password: string;
        createdAt: string;
    };
    authorId: string;
    content: string;
    updatedAt: string;
}

export default function FeaturedPost() {
    const [featuredPosts, setFeaturedPosts] = useState<FeaturedPost>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedPosts = async () => {
            try {
                const response = await fetch("/api/featured-post");
                if (!response.ok) {
                    throw new Error("Failed to fetch featured posts");
                }
                const data = await response.json();
                setFeaturedPosts(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load posts"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-destructive">
                Error: {error}
            </div>
        );
    }

    console.log(featuredPosts)

    return (
        <section className="py-12 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
                Featured Posts
            </h2>
            <div className="max-w-7xl mx-auto">
                <FeaturedPostCard post={featuredPosts as FeaturedPost} />
            </div>
        </section>
    );
}
