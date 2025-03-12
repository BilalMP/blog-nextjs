"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostContent from "./PostContent";
import BlogCard from "./BlogCard";
import { getPostById, getPosts } from "../lib/post";

const Post = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [post, setPost] = useState<any>(null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;

        const currentPost = getPostById(id as string);

        if (!currentPost) {
            router.push("/blog");
            return;
        }

        setPost(currentPost);

        const allPost = getPosts();
        const related = allPost
            .filter(
                (p) =>
                    p.id !== id &&
                    p.categories.some((c) => currentPost.categories.includes(c))
            )
            .slice(0, 3);

        setRelatedPosts(related);

        window.scrollTo(0, 0);
    }, [id, router]);

    if (!post) return null;

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
