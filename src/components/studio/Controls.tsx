import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Slider } from "@/components/ui/slider"
import { RefreshCw, Shuffle, Share2 } from "lucide-react"
import { ExportDrawer } from "./ExportDrawer"

export function Controls() {
    const {
        generate,
        generatePalette,
        generateFonts,
        paletteConstraints,
        setPaletteConstraint,
        fontVibe,
        setFontVibe
    } = useAppStore()

    return (
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold tracking-tight">Studio Controls</h2>
                <p className="text-sm text-muted-foreground">Adjust constraints and generate.</p>
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 gap-3">
                <Button onClick={generate} size="lg" className="w-full gap-2">
                    <Shuffle className="h-4 w-4" /> Generate All
                </Button>
                <div className="grid grid-cols-2 gap-3">
                    <Button onClick={generatePalette} variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" /> Palette
                    </Button>
                    <Button onClick={generateFonts} variant="outline" className="gap-2">
                        <RefreshCw className="h-4 w-4" /> Fonts
                    </Button>
                </div>

                <ExportDrawer>
                    <Button variant="secondary" className="w-full gap-2">
                        <Share2 className="h-4 w-4" /> Export / Share
                    </Button>
                </ExportDrawer>

            </div>

            <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Palette Constraints</h3>

                {/* Mode */}
                <div className="flex items-center justify-between">
                    <Label htmlFor="mode-switch">Dark Mode Probability</Label>
                    <Select
                        value={paletteConstraints.mode}
                        onValueChange={(val: any) => setPaletteConstraint("mode", val)}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="random">Random</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Harmony */}
                <div className="space-y-2">
                    <Label>Harmony</Label>
                    <Select
                        value={paletteConstraints.harmony}
                        onValueChange={(val: any) => setPaletteConstraint("harmony", val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Harmony" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="random">Random</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="analogous">Analogous</SelectItem>
                            <SelectItem value="monochromatic">Monochromatic</SelectItem>
                            <SelectItem value="complementary">Complementary</SelectItem>
                            <SelectItem value="split-complementary">Split Complementary</SelectItem>
                            <SelectItem value="triadic">Triadic</SelectItem>
                            <SelectItem value="tetradic">Tetradic (Double)</SelectItem>
                            <SelectItem value="compound">Compound</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Saturation */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Saturation</Label>
                        <span className="text-xs text-muted-foreground capitalize">{paletteConstraints.saturation}</span>
                    </div>
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className="py-4"
                        onValueChange={(vals) => {
                            const v = vals[0]
                            let sat: "low" | "medium" | "high" = "medium"
                            if (v < 30) sat = "low"
                            else if (v > 70) sat = "high"
                            setPaletteConstraint("saturation", sat)
                        }}
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                        <span>Low</span>
                        <span>Mid</span>
                        <span>High</span>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold text-sm uppercase text-muted-foreground tracking-wider">Typography</h3>

                <div className="space-y-2">
                    <Label>Vibe</Label>
                    <Select value={fontVibe} onValueChange={(val: any) => setFontVibe(val)}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="random">Random</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="tech">Tech</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Typography Engine v2 Controls */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="space-y-2">
                        <Label className="text-xs">Scale</Label>
                        <Select
                            value={useAppStore.getState().typographySettings.scale}
                            onValueChange={(val: any) => useAppStore.getState().setTypographySetting("scale", val)}
                        >
                            <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="minorSecond">Minor 2nd (1.067)</SelectItem>
                                <SelectItem value="majorSecond">Major 2nd (1.125)</SelectItem>
                                <SelectItem value="majorThird">Major 3rd (1.250)</SelectItem>
                                <SelectItem value="perfectFourth">Perf. 4th (1.333)</SelectItem>
                                <SelectItem value="goldenRatio">Golden (1.618)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs">Base Size</Label>
                        <Select
                            value={useAppStore.getState().typographySettings.baseSize.toString()}
                            onValueChange={(val: any) => useAppStore.getState().setTypographySetting("baseSize", parseInt(val))}
                        >
                            <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="14">14px</SelectItem>
                                <SelectItem value="16">16px</SelectItem>
                                <SelectItem value="18">18px</SelectItem>
                                <SelectItem value="20">20px</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6 text-xs text-muted-foreground">
                <p>Shortcuts: Space (Gen), P (Palette), F (Fonts)</p>
            </div>
        </div >
    )
}
