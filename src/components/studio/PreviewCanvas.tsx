import { useAppStore } from "@/store/useAppStore"
import type { Palette } from "@/engine/palette"
import { PaletteStrip } from "./PaletteStrip"
import { FontHeader } from "./FontHeader"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebsitePreview } from "./previews/WebsitePreview"
import { AppPreview } from "./previews/AppPreview"
import { TypeSpecimen } from "./previews/TypeSpecimen"
import { A11yCheck } from "./previews/A11yCheck"
import { DashboardPreview } from "./previews/DashboardPreview"
import { hexToHsl, toCssHsl } from "@/engine/color"

function mapPaletteToVars(palette: Palette, fontHeading: string, fontBody: string): React.CSSProperties {
    return {
        "--background": toCssHsl(hexToHsl(palette.bg)),
        "--foreground": toCssHsl(hexToHsl(palette.text)),
        "--primary": toCssHsl(hexToHsl(palette.primary)),
        "--primary-foreground": toCssHsl(hexToHsl(palette.onPrimary)),
        "--muted": toCssHsl(hexToHsl(palette.surface)), // Using surface as muted/card bg often
        "--muted-foreground": toCssHsl(hexToHsl(palette.mutedText)),
        "--card": toCssHsl(hexToHsl(palette.surface)),
        "--card-foreground": toCssHsl(hexToHsl(palette.text)),
        "--border": toCssHsl(hexToHsl(palette.border)),
        "--accent": toCssHsl(hexToHsl(palette.accent)),
        "--accent-foreground": toCssHsl(hexToHsl(palette.onAccent)),
        "--destructive": toCssHsl(hexToHsl(palette.error)),
        "--destructive-foreground": toCssHsl(hexToHsl(palette.onError)),
        "--input": toCssHsl(hexToHsl(palette.border)),
        "--ring": toCssHsl(hexToHsl(palette.primary)),

        // Fonts
        "--font-heading": fontHeading,
        "--font-body": fontBody,
    } as React.CSSProperties
}

export function PreviewCanvas() {
    const { palette, fonts, tab, setTab } = useAppStore()

    const style = mapPaletteToVars(palette, fonts.heading.name, fonts.body.name)

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-shrink-0 bg-background z-10 shadow-sm">
                <PaletteStrip />
                <FontHeader />
            </div>

            <div className="flex-shrink-0 border-b bg-muted/40 px-4 py-2 flex items-center justify-between">
                <Tabs value={tab} onValueChange={(v: any) => setTab(v)} className="w-full">
                    <div className="w-full overflow-x-auto pb-1 no-scrollbar">
                        <TabsList className="w-full justify-start md:w-auto md:justify-center">
                            <TabsTrigger value="website">Website</TabsTrigger>
                            <TabsTrigger value="app">App UI</TabsTrigger>
                            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                            <TabsTrigger value="type">Typography</TabsTrigger>
                            <TabsTrigger value="a11y">Accessibility</TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>
            </div>

            <div
                className="flex-1 overflow-auto p-4 md:p-8 transition-colors duration-500"
                style={style}
            >
                {/* 
                    We wrap the content in a div that applies the variables locally. 
                    However, the style logic above applies to the *container*. 
                    We need to make sure the inner components use these vars.
                    Tailwind uses these vars, so it should work automatically.
                    
                    We also need to apply the font families.
                */}
                <div
                    className="mx-auto max-w-5xl rounded-lg border bg-background shadow-xl min-h-[600px] overflow-hidden transition-all duration-500"
                    style={{ fontFamily: "var(--font-body)" }}
                    id="preview-root"
                >
                    {tab === "website" && <WebsitePreview />}
                    {tab === "app" && <AppPreview />}
                    {tab === "dashboard" && <DashboardPreview />}
                    {tab === "type" && <TypeSpecimen />}
                    {tab === "a11y" && <A11yCheck />}
                </div>
            </div>
        </div>
    )
}
