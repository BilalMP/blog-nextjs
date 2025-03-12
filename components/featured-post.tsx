import FeaturedPostCard from "./FeaturedPostCard";

const FeaturedPost = () => {
    return (
        <section className="py-10 md:py-6 px-6 md:px-10 bg-secondary/30">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="font-bold text-2xl md:text-3xl">
                        Featured Post
                    </h2>
                </div>
                <FeaturedPostCard post={FeaturedPostData} />
            </div>
        </section>
    );
};

export default FeaturedPost;


const FeaturedPostData = {
    id: "1",
    title: "TitGetting Started with Next.js and Prisma",
    excerpt:
        "Learn how to set up a blog using Next.js and Prisma with a PostgreSQL database for a blazing fast experience.",
    coverImage:
        "https://images.pexels.com/photos/100581/pexels-photo-100581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "April 12, 2023",
    readingTime: "5 min read",
    categories: ["Category 1", "Category 2"],
};
