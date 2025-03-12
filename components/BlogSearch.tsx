"use client";

import { useState } from "react";

const BlogSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="max-w-md mx-auto">
            <input
                type="text"
                placeholder="Search Articles ... "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/30"
            />
        </div>
    );
};

export default BlogSearch;
