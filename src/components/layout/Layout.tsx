import type { ReactNode } from "react"
import { FontLoader } from "../FontLoader" // updated path


interface LayoutProps {
    children: ReactNode
    controls: ReactNode
}

export function Layout({ children, controls }: LayoutProps) {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground md:flex-row">
            <FontLoader />

            {/* Desktop Sidebar Controls */}
            <aside className="hidden w-80 flex-shrink-0 border-r border-border bg-card md:flex md:flex-col">
                {controls}
            </aside>

            {/* Main Canvas */}
            <main className="flex-1 overflow-auto bg-muted/20 relative">
                <div className="min-h-full w-full">
                    {children}
                </div>
            </main>

            {/* Mobile Controls (Bottom Sheet Trigger would go here, or handled by Controls component) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4">
                {/* Placeholder for mobile actions */}
                Mobile Controls
            </div>
        </div>
    )
}
