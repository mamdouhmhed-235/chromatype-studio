import { useAppStore } from "@/store/useAppStore"
import type { Palette } from "@/engine/palette"
import { Button } from "@/components/ui/button"
import { Lock, Unlock, Copy } from "lucide-react"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


function Swatch({ role, color, locked, onToggle }: { role: keyof Palette, color: string, locked: boolean, onToggle: () => void }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(color)
        toast.success(`Copied ${role}: ${color}`)
    }

    return (
        <TooltipProvider delayDuration={300}>
            <div className="group relative flex flex-col gap-1">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="h-16 w-full rounded-md border shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden"
                            style={{ backgroundColor: color }}
                            onClick={copyToClipboard}
                        >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                <Copy className="h-4 w-4 text-white drop-shadow-md" />
                            </div>
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-6 w-6 bg-black/20 hover:bg-black/40 text-white"
                                    onClick={(e) => { e.stopPropagation(); onToggle() }}
                                >
                                    {locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                                </Button>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Click to copy {color}</p>
                    </TooltipContent>
                </Tooltip>

                <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-medium text-muted-foreground capitalize">{role}</span>
                    <span className="text-[10px] text-muted-foreground font-mono opacity-50">{color}</span>
                </div>
            </div>
        </TooltipProvider>
    )
}

export function PaletteStrip() {
    const { palette, lockedRoles, togglePaletteLock } = useAppStore()

    const roles: (keyof Palette)[] = [
        "primary", "onPrimary",
        "accent", "onAccent",
        "bg", "surface",
        "text", "mutedText",
        "border", "error"
    ]

    return (
        <div className="flex w-full overflow-x-auto gap-4 p-4 bg-card border-b">
            {roles.map(role => (
                <div key={role} className="min-w-[100px]">
                    <Swatch
                        role={role}
                        color={palette[role]}
                        locked={lockedRoles.has(role)}
                        onToggle={() => togglePaletteLock(role)}
                    />
                </div>
            ))}
        </div>
    )
}
