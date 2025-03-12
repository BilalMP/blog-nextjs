import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/30 py-10 px-6 md:px-10 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="inline-block text-xl font-display font-semibold"
                        >
                            Minimal<span className="text-primary/70">Blog</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            A beautifully designed blog platform for sharing
                            your thoughts and ideas with the world.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                            Navigation
                        </h3>
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href="/"
                                className="text-sm hover:text-primary transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/blog"
                                className="text-sm hover:text-primary transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/about"
                                className="text-sm hover:text-primary transition-colors"
                            >
                                About
                            </Link>
                        </nav>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                            Connect
                        </h3>
                        <div className="flex flex-col space-y-2">
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-primary transition-colors"
                            >
                                Twitter
                            </Link>
                            <Link
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-primary transition-colors"
                            >
                                GitHub
                            </Link>
                            <Link
                                href="mailto:hello@minimalblog.com"
                                className="text-sm hover:text-primary transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© {currentYear} MinimalBlog. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link
                            href="/privacy"
                            className="hover:text-primary transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-primary transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
