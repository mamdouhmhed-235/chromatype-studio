import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { Lock, Unlock } from "lucide-react"

export function FontHeader() {
    const { fonts, lockedFonts, toggleFontLock } = useAppStore()

    return (
        <div className="flex w-full items-center gap-8 p-4 bg-card border-b">
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Heading</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold" style={{ fontFamily: fonts.heading.name }}>{fonts.heading.name}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleFontLock("heading")}
                        >
                            {lockedFonts.has("heading") ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="h-8 w-px bg-border" />

            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Body</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xl" style={{ fontFamily: fonts.body.name }}>{fonts.body.name}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleFontLock("body")}
                        >
                            {lockedFonts.has("body") ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
