"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostContent from "./PostContent";
import BlogCard from "./BlogCard";

const Post = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [post, setPost] = useState<{
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
            bio: string 
        };
    } | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/get-blog-by-id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId: id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch post");
            }

            const data = await response.json();
            
            // Validate and transform API response
            if (!data || typeof data !== 'object') {
                throw new Error("Invalid post data format from API");
            }

            const processedPost = {
                id: data.id,
                title: data.title,
                content: data.content,
                coverImage: data.coverImage || '/next.svg',
                date: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Unknown date',
                readingTime: data.readingTime || '5 min read',
                categories: data.categories?.map((c: any) => ({ name: c.name })) || [],
                author: {
                    name: data.author?.name || 'Anonymous',
                    avatar: data.author?.avatar || '',
                    bio: data.author?.bio || ''
                }
            };

            setPost(processedPost);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!id) {
            return;
        }
        fetchData();
    }, [id, router]);

    if (!post) return null;

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <main className="min-h-screen pt-24">
            <PostContent post={post} />
            {relatedPosts.length > 0 && (
                <section className="py-10 md:py-16 px-6 md:px-10 bg-secondary/30">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center">
                            Related Articles
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((post) => (
                                <BlogCard
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default Post;
