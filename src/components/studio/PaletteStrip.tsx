import { useAppStore } from "@/store/useAppStore"
import type { Palette } from "@/engine/palette"
import { Button } from "@/components/ui/button"
import { Lock, Unlock } from "lucide-react"
import { toast } from "sonner"


function Swatch({ role, color, locked, onToggle }: { role: keyof Palette, color: string, locked: boolean, onToggle: () => void }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(color)
        toast.success(`Copied ${role}: ${color}`)
    }

    return (
        <div className="group relative flex flex-col gap-1">
            <div
                className="h-16 w-full rounded-md border shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={copyToClipboard}
            >
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-muted-foreground capitalize">{role}</span>
                <span className="text-[10px] text-muted-foreground font-mono opacity-50">{color}</span>
            </div>
        </div>
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
