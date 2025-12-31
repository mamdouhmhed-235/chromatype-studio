
import { PRNG } from "./prng"
import { type HSL, hslToHex, hexToHsl, hslToRgb, getLuminance } from "./color"

export type HarmonyMode = "neutral" | "analogous" | "complementary" | "triadic" | "compound" | "split-complementary" | "tetradic" | "monochromatic"

export interface PaletteConstraints {
    mode: "light" | "dark" | "random"
    contrastStrategy: "AA" | "AAA"
    harmony: HarmonyMode | "random"
    saturation: "low" | "medium" | "high" | "random"
}

export interface Palette {
    bg: string
    surface: string
    border: string
    text: string
    mutedText: string
    primary: string
    onPrimary: string
    accent: string
    onAccent: string
    secondary: string // New for tetradic/split
    onSecondary: string
    success: string
    onSuccess: string
    warning: string
    onWarning: string
    error: string
    onError: string
    info: string
    onInfo: string
}

export class PaletteGenerator {
    private prng: PRNG

    constructor(seed: number | string) {
        this.prng = new PRNG(seed)
    }

    private constrainSaturation(s: number, mode: PaletteConstraints["saturation"]): number {
        switch (mode) {
            case "low": return this.prng.range(5, 30)
            case "medium": return this.prng.range(30, 70)
            case "high": return this.prng.range(70, 95)
            default: return s
        }
    }

    private getContrastColor(bgHex: string): string {
        const bgRgb = hslToRgb(hexToHsl(bgHex))
        const bgL = getLuminance(bgRgb)
        return bgL > 0.5 ? "#000000" : "#ffffff"
    }

    generate(constraints: PaletteConstraints): Palette {
        // 1. Determine Base Parameters
        const isDark = constraints.mode === "random"
            ? this.prng.bool()
            : constraints.mode === "dark"

        const harmony = constraints.harmony === "random"
            ? this.prng.pick(["neutral", "analogous", "complementary", "triadic", "compound", "split-complementary", "tetradic", "monochromatic"]) as HarmonyMode
            : constraints.harmony

        const baseHue = this.prng.range(0, 360)

        // 2. Generate Neutrals (Bg, Surface, Text)
        const bgL = isDark ? this.prng.range(2, 10) : this.prng.range(95, 99)
        const surfaceL = isDark ? bgL + this.prng.range(5, 10) : bgL - this.prng.range(3, 8)

        const neutralSat = this.prng.range(0, 10)
        const neutralHue = baseHue

        const bg: HSL = { h: neutralHue, s: neutralSat, l: bgL }
        const surface: HSL = { h: neutralHue, s: neutralSat, l: surfaceL }

        const textL = isDark ? this.prng.range(85, 98) : this.prng.range(5, 15)
        const text: HSL = { h: neutralHue, s: this.prng.range(0, 5), l: textL }
        const mutedText: HSL = {
            h: neutralHue,
            s: this.prng.range(0, 5),
            l: isDark ? textL - 25 : textL + 25
        }
        const border: HSL = {
            h: neutralHue,
            s: this.prng.range(0, 10),
            l: isDark ? bgL + 15 : bgL - 10
        }

        // 3. Generate Accents based on Harmony
        let primaryHue = baseHue
        let accentHue = (baseHue + 180) % 360
        let secondaryHue = (baseHue + 90) % 360 // Default secondary

        switch (harmony) {
            case "analogous":
                accentHue = (baseHue + 30) % 360
                secondaryHue = (baseHue - 30 + 360) % 360
                break
            case "triadic":
                accentHue = (baseHue + 120) % 360
                secondaryHue = (baseHue + 240) % 360
                break
            case "compound":
                accentHue = (baseHue + 160) % 360
                secondaryHue = (baseHue + 20) % 360
                break
            case "split-complementary":
                accentHue = (baseHue + 150) % 360
                secondaryHue = (baseHue + 210) % 360
                break
            case "tetradic":
                accentHue = (baseHue + 90) % 360
                secondaryHue = (baseHue + 180) % 360 // Actually tetradic is often 4 colors. We'll reuse accent/secondary logic.
                // 4th color would be (base+270)
                break
            case "monochromatic":
                accentHue = baseHue
                secondaryHue = baseHue
                break
            case "neutral":
                accentHue = baseHue
                primaryHue = baseHue
                secondaryHue = baseHue
                break
            default: // complementary
                accentHue = (baseHue + 180) % 360
                secondaryHue = (baseHue + 180) % 360
                break
        }

        const sat = constraints.saturation === "random" ? this.prng.range(40, 90) : 50
        const finalSat = this.constrainSaturation(sat, constraints.saturation)

        // Luminance logic
        // Monochromatic needs variance in L, others can share similar L
        let primaryL = isDark ? this.prng.range(50, 70) : this.prng.range(40, 60)
        let accentL = isDark ? primaryL + 10 : primaryL + 5
        let secondaryL = primaryL

        if (harmony === "monochromatic") {
            accentL = isDark ? primaryL + 20 : primaryL - 20
            secondaryL = isDark ? primaryL - 20 : primaryL + 20
        }

        const primary: HSL = { h: primaryHue, s: finalSat, l: primaryL }
        const accent: HSL = { h: accentHue, s: finalSat, l: accentL }
        const secondary: HSL = { h: secondaryHue, s: finalSat * 0.8, l: secondaryL }

        // 4. Semantic Colors (Success, Warning, Info, Error)
        // We ensure they are visible but harmonized if possible? 
        // Or strictly standard (Green, Orange, Blue, Red)?
        // Let's standardise hues but match saturation/lightness to the theme atmosphere
        const semSat = Math.max(finalSat, 60)
        const semL = isDark ? 65 : 45

        const success: HSL = { h: 142, s: semSat, l: semL }
        const warning: HSL = { h: 35, s: semSat, l: semL }
        const info: HSL = { h: 210, s: semSat, l: semL }
        const error: HSL = { h: 0, s: semSat, l: semL }

        return {
            bg: hslToHex(bg),
            surface: hslToHex(surface),
            border: hslToHex(border),
            text: hslToHex(text),
            mutedText: hslToHex(mutedText),
            primary: hslToHex(primary),
            onPrimary: this.getContrastColor(hslToHex(primary)),
            accent: hslToHex(accent),
            onAccent: this.getContrastColor(hslToHex(accent)),
            secondary: hslToHex(secondary),
            onSecondary: this.getContrastColor(hslToHex(secondary)),

            success: hslToHex(success),
            onSuccess: this.getContrastColor(hslToHex(success)),
            warning: hslToHex(warning),
            onWarning: this.getContrastColor(hslToHex(warning)),
            info: hslToHex(info),
            onInfo: this.getContrastColor(hslToHex(info)),
            error: hslToHex(error),
            onError: this.getContrastColor(hslToHex(error)),
        }
    }
}
