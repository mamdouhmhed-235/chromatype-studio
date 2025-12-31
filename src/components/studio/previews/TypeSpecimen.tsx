export function TypeSpecimen() {
    return (
        <div className="p-12 space-y-12">
            <div>
                <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>Typography.</h1>
                <p className="text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                    A clear hierarchy is essential for readability and user experience.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Heading 1</span>
                        <h1 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>The quick brown fox.</h1>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Heading 2</span>
                        <h2 className="text-2xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Jumps over the lazy dog.</h2>
                    </div>
                    <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">Heading 3</span>
                        <h3 className="text-xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Pack my box with five dozen.</h3>
                    </div>
                </div>

                <div className="space-y-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Body Text</span>
                    <p className="leading-7">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="leading-7 text-muted-foreground">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-lg opacity-80">
                        "Good design is obvious. Great design is transparent."
                    </blockquote>
                </div>
            </div>
        </div>
    )
}
