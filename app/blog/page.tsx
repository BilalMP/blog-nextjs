import BlogCategoriesFilter from "@/components/BlogCategoriesFilter";
import BlogHeader from "@/components/BlogHeader";
import BlogSearch from "@/components/BlogSearch";
import FilteredPost from "@/components/FilteredPost";

const Blog = () => {
    return (
        <>
            <BlogHeader />
            <BlogSearch />
            <BlogCategoriesFilter />
            <FilteredPost />
        </>
    );
};

export default Blog;
