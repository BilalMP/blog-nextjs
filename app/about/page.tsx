import { Card } from "@/components/ui/card";
import { Users, Target, Award, BookOpen, Briefcase } from "lucide-react";

const About = () => {
    return (
        <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
                    About MinimalBlog
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    A modern platform for writers and readers to connect through
                    meaningful content.
                </p>
            </div>

            {/* Our Story Section */}
            <div className="mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Our Story
                        </h2>
                        <p className="text-muted-foreground mb-4">
                            MinimalBlog was founded in 2023 with a simple
                            mission: to create a clean, distraction-free
                            platform where writers can share their ideas and
                            readers can discover quality content without the
                            noise.
                        </p>
                        <p className="text-muted-foreground">
                            What started as a small project has grown into a
                            thriving community of writers, developers,
                            designers, and passionate readers who value
                            thoughtful, well-crafted content.
                        </p>
                    </div>
                    <Card className="bg-secondary/50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-md mr-4">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">
                                    Growing Community
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Over 10,000 readers monthly
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="bg-primary/10 p-3 rounded-md mr-4">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Quality Content</h3>
                                <p className="text-sm text-muted-foreground">
                                    Curated articles from expert writers
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-primary/10 p-3 rounded-md mr-4">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Clear Focus</h3>
                                <p className="text-sm text-muted-foreground">
                                    Distraction-free reading experience
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Our Mission Section */}
            <div className="mb-20">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                        We believe in the power of words to inspire, educate,
                        and transform. Our mission is to create a platform that
                        prioritizes content quality and readability above all
                        else.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card p-6 rounded-lg shadow-sm">
                        <div className="bg-primary/10 p-3 rounded-md inline-block mb-4">
                            <Award className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                            Quality First
                        </h3>
                        <p className="text-muted-foreground">
                            We curate and promote content that meets high
                            standards for accuracy, depth, and originality.
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-lg shadow-sm">
                        <div className="bg-primary/10 p-3 rounded-md inline-block mb-4">
                            <Target className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                            Accessibility
                        </h3>
                        <p className="text-muted-foreground">
                            We design our platform to be accessible to everyone,
                            regardless of their device or abilities.
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-lg shadow-sm">
                        <div className="bg-primary/10 p-3 rounded-md inline-block mb-4">
                            <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">
                            Creator Support
                        </h3>
                        <p className="text-muted-foreground">
                            We provide tools and resources to help writers
                            create, publish, and grow their audience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-20">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                        Meet the dedicated people behind MinimalBlog who work
                        tirelessly to create the best platform for writers and
                        readers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        {
                            name: "Sarah Wilson",
                            role: "Founder & CEO",
                            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                        },
                        {
                            name: "John Doe",
                            role: "Head of Content",
                            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                        },
                        {
                            name: "Alex Johnson",
                            role: "Lead Developer",
                            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
                        },
                        {
                            name: "Jane Smith",
                            role: "UX Designer",
                            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                        },
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="text-center"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="font-semibold text-lg">
                                {member.name}
                            </h3>
                            <p className="text-muted-foreground">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <Card className="bg-secondary/50 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Join Our Community
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                    Whether you're a writer looking to share your insights or a
                    reader seeking quality content, we welcome you to become
                    part of our growing community.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/blog"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Explore Articles
                    </a>
                    <a
                        href="/contact"
                        className="px-6 py-3 bg-secondary text-foreground border border-input rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default About;
