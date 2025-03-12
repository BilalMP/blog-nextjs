import React from "react";

const BlogHeader = () => {
    return (
        <div className="pt-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-up">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
                        Our Blog
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore our collection of articles, guides, and
                        insights.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogHeader;
