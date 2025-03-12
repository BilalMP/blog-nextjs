import FeaturedPost from "@/components/featured-post";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import RecentsPosts from "@/components/recents-post";

const Home = () => {
    return (
        <>
        <Hero />
        <FeaturedPost />
        <RecentsPosts />
        <Newsletter />
        </>
    );
};

export default Home;
