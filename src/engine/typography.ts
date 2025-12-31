export type TypeScale = "minorSecond" | "majorSecond" | "minorThird" | "majorThird" | "perfectFourth" | "augmentedFourth" | "perfectFifth" | "goldenRatio"

export const TYPE_SCALES: Record<TypeScale, { name: string; ratio: number }> = {
    minorSecond: { name: "Minor Second", ratio: 1.067 },
    majorSecond: { name: "Major Second", ratio: 1.125 },
    minorThird: { name: "Minor Third", ratio: 1.200 },
    majorThird: { name: "Major Third", ratio: 1.250 },
    perfectFourth: { name: "Perfect Fourth", ratio: 1.333 },
    augmentedFourth: { name: "Augmented Fourth", ratio: 1.414 },
    perfectFifth: { name: "Perfect Fifth", ratio: 1.500 },
    goldenRatio: { name: "Golden Ratio", ratio: 1.618 },
}

export interface TypographySettings {
    scale: TypeScale
    baseSize: number // px, default 16
    lineHeight: "tight" | "normal" | "loose"
    letterSpacing: "tight" | "normal" | "wide"
}

export interface TypeSystem {
    scaleRatio: number
    baseSize: string
    lineHeights: {
        body: string
        heading: string
    }
    letterSpacing: {
        body: string
        heading: string
    }
    sizes: {
        xs: string
        sm: string
        base: string
        lg: string
        xl: string
        "2xl": string
        "3xl": string
        "4xl": string
    }
}

export class TypographyGenerator {
    static generate(settings: TypographySettings): TypeSystem {
        const ratio = TYPE_SCALES[settings.scale].ratio

        // Calculate sizes
        // base = 1rem (assuming root is set to baseSize)
        // or actually, let's return rem values assuming 1rem = baseSize
        // No, easier to just return variables that can be set on :root

        return {
            scaleRatio: ratio,
            baseSize: `${settings.baseSize}px`,
            lineHeights: this.getLineHeights(settings.lineHeight),
            letterSpacing: this.getLetterSpacing(settings.letterSpacing),
            sizes: {
                xs: `${(1 / ratio).toFixed(3)}rem`,
                sm: `${(1 / Math.sqrt(ratio)).toFixed(3)}rem`, // slightly smoother step down? or standard scale? 
                // Standard scale: base / ratio
                base: "1rem",
                lg: `${ratio.toFixed(3)}rem`,
                xl: `${(ratio * ratio).toFixed(3)}rem`,
                "2xl": `${(ratio ** 3).toFixed(3)}rem`,
                "3xl": `${(ratio ** 4).toFixed(3)}rem`,
                "4xl": `${(ratio ** 5).toFixed(3)}rem`,
            }
        }
    }

    private static getLineHeights(mode: TypographySettings["lineHeight"]) {
        switch (mode) {
            case "tight": return { body: "1.4", heading: "1.1" }
            case "loose": return { body: "1.8", heading: "1.4" }
            default: return { body: "1.6", heading: "1.25" }
        }
    }

    private static getLetterSpacing(mode: TypographySettings["letterSpacing"]) {
        switch (mode) {
            case "tight": return { body: "-0.01em", heading: "-0.02em" }
            case "wide": return { body: "0.02em", heading: "0.05em" }
            default: return { body: "0em", heading: "-0.01em" }
        }
    }
}
