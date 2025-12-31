import { useAppStore } from "@/store/useAppStore"
import { getContrast } from "@/engine/color"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

function ContrastCard({ bg, fg, bgName, fgName }: { bg: string, fg: string, bgName: string, fgName: string }) {
    const ratio = getContrast(bg, fg)
    const aa = ratio >= 4.5
    const aaa = ratio >= 7

    return (
        <Card className="p-4 flex items-center justify-between" style={{ backgroundColor: bg, borderColor: bg === "#ffffff" ? "#eee" : bg }}>
            <div className="flex flex-col gap-1">
                <span className="text-sm font-bold" style={{ color: fg }}>{fgName} on {bgName}</span>
                <span className="text-xs opacity-70" style={{ color: fg }}>Ratio: {ratio.toFixed(2)}:1</span>
            </div>
            <div className="flex gap-2">
                <Badge variant={aa ? "default" : "destructive"}>{aa ? "AA PASS" : "AA FAIL"}</Badge>
                <Badge variant={aaa ? "secondary" : "outline"} className={!aaa ? "opacity-50" : ""}>{aaa ? "AAA PASS" : "AAA FAIL"}</Badge>
            </div>
        </Card>
    )
}

export function A11yCheck() {
    const { palette } = useAppStore()

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-2">Contrast Validation</h2>
                <p className="text-muted-foreground">WCAG 2.1 compliance checks for key pairs.</p>
            </div>

            <div className="space-y-4">
                <ContrastCard bg={palette.bg} fg={palette.text} bgName="Background" fgName="Text" />
                <ContrastCard bg={palette.bg} fg={palette.mutedText} bgName="Background" fgName="Muted Text" />
                <ContrastCard bg={palette.surface} fg={palette.text} bgName="Surface" fgName="Text" />
                <ContrastCard bg={palette.primary} fg={palette.onPrimary} bgName="Primary" fgName="On Primary" />
                <ContrastCard bg={palette.accent} fg={palette.onAccent} bgName="Accent" fgName="On Accent" />
                <ContrastCard bg={palette.error} fg={palette.onError} bgName="Error" fgName="On Error" />
            </div>
        </div>
    )
}
