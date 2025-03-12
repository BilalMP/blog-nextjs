const Hero = () => {
    return (
        <section className="py-10 md:py-6 px-6 md:px-10 mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-6 max-w-3xl mx-auto animate-fade-up">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance">
                        Welcome to MinimalBlog
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
                        A beautifully designed blog platform for sharing
                        thoughts and ideas with elegant simplicity.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
