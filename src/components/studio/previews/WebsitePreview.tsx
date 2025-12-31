import { Button } from "@/components/ui/button"

export function WebsitePreview() {
    return (
        <div className="flex flex-col font-sans">
            <header className="flex items-center justify-between border-b px-8 py-6">
                <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>Brand.</span>
                <nav className="hidden gap-6 text-sm font-medium md:flex">
                    <a href="#" className="text-muted-foreground hover:text-foreground">Features</a>
                    <a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a>
                    <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
                </nav>
                <div className="flex gap-4">
                    <Button variant="ghost">Log In</Button>
                    <Button>Get Started</Button>
                </div>
            </header>

            <section className="px-8 py-24 text-center">
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
                    Build faster with <span className="text-primary">Colors</span>.
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                    A demonstrative verification of the generated palette and typography variables in a real-world layout.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-lg">Start Building</Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-lg">Learn More</Button>
                </div>
            </section>

            <section className="bg-muted/50 px-8 py-20">
                <div className="grid gap-8 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="mb-4 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                Let
                            </div>
                            <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Feature {i}</h3>
                            <p className="text-muted-foreground">
                                This card tests the card background, border, and text hierarchy.
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
