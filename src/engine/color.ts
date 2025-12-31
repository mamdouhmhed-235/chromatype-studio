export type HSL = { h: number; s: number; l: number }
export type RGB = { r: number; g: number; b: number }

/**
 * Parses a hex color string to RGB
 */
export function hexToRgb(hex: string): RGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null
}

/**
 * Converts RGB to Hex
 */
export function rgbToHex({ r, g, b }: RGB): string {
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16)
                return hex.length === 1 ? "0" + hex : hex
            })
            .join("")
    )
}

/**
 * Converts RGB to HSL
 */
export function rgbToHsl({ r, g, b }: RGB): HSL {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    let h = 0,
        s = 0,
        l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
}

/**
 * Converts HSL to RGB
 */
export function hslToRgb({ h, s, l }: HSL): RGB {
    let r, g, b

    if (s === 0) {
        r = g = b = l / 100 // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l / 100 < 0.5 ? (l / 100) * (1 + s / 100) : l / 100 + s / 100 - (l / 100) * (s / 100)
        const p = 2 * (l / 100) - q
        r = hue2rgb(p, q, h / 360 + 1 / 3)
        g = hue2rgb(p, q, h / 360)
        b = hue2rgb(p, q, h / 360 - 1 / 3)
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

/**
 * Converts Hex to HSL
 */
export function hexToHsl(hex: string): HSL {
    const rgb = hexToRgb(hex)
    if (!rgb) return { h: 0, s: 0, l: 0 }
    return rgbToHsl(rgb)
}

/**
 * Converts HSL to Hex
 */
export function hslToHex(hsl: HSL): string {
    const rgb = hslToRgb(hsl)
    return rgbToHex(rgb)
}

/**
 * Calculates relative luminance (WCAG 2.0)
 */
export function getLuminance({ r, g, b }: RGB): number {
    const a = [r, g, b].map((v) => {
        v /= 255
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

/**
 * Calculates contrast ratio between two colors (WCAG 2.0)
 * Returns values between 1 and 21.
 */
export function getContrast(c1: HSL | string, c2: HSL | string): number {
    const rgb1 = typeof c1 === "string" ? hexToRgb(c1) : hslToRgb(c1)
    const rgb2 = typeof c2 === "string" ? hexToRgb(c2) : hslToRgb(c2)

    if (!rgb1 || !rgb2) return 1

    const l1 = getLuminance(rgb1)
    const l2 = getLuminance(rgb2)

    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/**
 * Returns formatted HSL string for CSS: "h s% l%"
 */
export function toCssHsl(hsl: HSL): string {
    return `${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%`
}
