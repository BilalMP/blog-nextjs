"use client"
import { useState } from "react";

const BlogCategoriesFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    return (
        <div className="flex flex-wrap justify-center gap-2 py-10 md:py-16 px-6 md:px-10">
            {categories.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        setSelectedCategory(item.category);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        selectedCategory === item.category
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                    }`}
                >
                    {item.category}
                </button>
            ))}
        </div>
    );
};

export default BlogCategoriesFilter;

const categories = [
    { id: "1", category: "All" },
    { id: "2", category: "Next.js" },
    { id: "3", category: "Prisma" },
    { id: "4", category: "Tutorial" },
    { id: "5", category: "Tailwindcss" },
    { id: "6", category: "Design" },
    { id: "7", category: "Frontend" },
    { id: "8", category: "React" },
    { id: "9", category: "Markdown" },
    { id: "10", category: "Nodejs" },
    { id: "11", category: "PostgresSQL" },
    { id: "12", category: "TypeScript" },
    { id: "13", category: "API" },
    { id: "14", category: "Express.js" },
    { id: "15", category: "Nest.js" },
    { id: "16", category: "GraphQL" },
    { id: "17", category: "Docker" },
    { id: "18", category: "Kubernetes" },
    { id: "19", category: "Serverless" },
    { id: "20", category: "AWS" },
    { id: "21", category: "Azure" },
    { id: "22", category: "Google Cloud" },
    { id: "23", category: "Firebase" },
    { id: "24", category: "MongoDB" },
    { id: "25", category: "MySQL" },
    { id: "26", category: "PostgreSQL" },
    { id: "27", category: "SQLite" },
];
