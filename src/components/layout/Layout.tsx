import type { ReactNode } from "react"
import { FontLoader } from "../FontLoader" // updated path
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader, DrawerDescription } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"


interface LayoutProps {
    children: ReactNode
    controls: ReactNode
}

export function Layout({ children, controls }: LayoutProps) {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground lg:flex-row">
            <FontLoader />

            {/* Desktop Sidebar Controls */}
            <aside className="hidden w-80 flex-shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
                {controls}
            </aside>

            {/* Main Canvas */}
            <main className="flex-1 overflow-auto bg-muted/20 relative">
                <div className="min-h-full w-full mb-16 lg:mb-0">
                    {children}
                </div>
            </main>



            {/* Mobile Controls */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4 z-50">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="default" className="w-full shadow-lg">
                            <Settings className="mr-2 h-4 w-4" />
                            Open Studio Controls
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm mb-8">
                            <DrawerHeader>
                                <DrawerTitle>Studio Controls</DrawerTitle>
                                <DrawerDescription>Adjust generation settings.</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 overflow-y-auto max-h-[60vh]">
                                {controls}
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
}
