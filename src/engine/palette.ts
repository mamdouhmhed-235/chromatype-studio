
import { PRNG } from "./prng"
import { type HSL, hslToHex, hexToHsl, hslToRgb, getLuminance } from "./color"

export type HarmonyMode = "neutral" | "analogous" | "complementary" | "triadic" | "compound"

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
    error: string
    onError: string
}

const DEFAULT_ERROR = "#ef4444"

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
            ? this.prng.pick(["neutral", "analogous", "complementary", "triadic", "compound"]) as HarmonyMode
            : constraints.harmony

        const baseHue = this.prng.range(0, 360)

        // 2. Generate Neutrals (Bg, Surface, Text)
        // Dark mode: Low L for bg. Light mode: High L.
        const bgL = isDark ? this.prng.range(2, 10) : this.prng.range(95, 99)
        const surfaceL = isDark ? bgL + this.prng.range(5, 10) : bgL - this.prng.range(3, 8) // Surface usually slightly lighter in dark, slightly darker in light (or vice versa depending on elevation style)
        // Actually, physically, surfaces are often lighter in dark mode (elevation = lightness), 
        // and in light mode, cards are white (100) on gray (95) OR gray (95) on white (100).
        // Let's stick to "Card is usually lighter than BG in dark mode". 
        // In light mode, let's go with "BG is slightly off-white, Surface is white" or "BG white, Surface off-white".
        // We'll trust the randomness:

        const neutralSat = this.prng.range(0, 10) // Keep neutrals low saturation
        const neutralHue = baseHue // Tint slightly with base hue

        const bg: HSL = { h: neutralHue, s: neutralSat, l: bgL }
        const surface: HSL = { h: neutralHue, s: neutralSat, l: surfaceL }

        const textL = isDark ? this.prng.range(85, 98) : this.prng.range(5, 15)
        // Ensure sufficient contrast
        // Recalculate if needed? For now, we rely on range. 
        // 10 vs 90 is usually > 7:1.

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

        if (harmony === "analogous") {
            accentHue = (baseHue + 30) % 360
        } else if (harmony === "triadic") {
            accentHue = (baseHue + 120) % 360
        } else if (harmony === "neutral") {
            accentHue = baseHue
            primaryHue = baseHue
        }

        const sat = constraints.saturation === "random" ? this.prng.range(40, 90) : 50 // temp placeholder
        const finalSat = this.constrainSaturation(sat, constraints.saturation)

        const primaryL = isDark ? this.prng.range(50, 70) : this.prng.range(40, 60)
        // Primary needs to be visible.

        const primary: HSL = { h: primaryHue, s: finalSat, l: primaryL }
        const accent: HSL = { h: accentHue, s: finalSat, l: isDark ? primaryL + 10 : primaryL + 5 }

        // 4. Calculate On-Colors
        const onPrimaryHex = this.getContrastColor(hslToHex(primary))
        const onAccentHex = this.getContrastColor(hslToHex(accent))
        const errorHex = DEFAULT_ERROR
        const onErrorHex = this.getContrastColor(errorHex)

        return {
            bg: hslToHex(bg),
            surface: hslToHex(surface),
            border: hslToHex(border),
            text: hslToHex(text),
            mutedText: hslToHex(mutedText),
            primary: hslToHex(primary),
            onPrimary: onPrimaryHex,
            accent: hslToHex(accent),
            onAccent: onAccentHex,
            error: errorHex,
            onError: onErrorHex
        }
    }
}
