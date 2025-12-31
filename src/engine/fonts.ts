import fontsData from "../data/fonts.json"
import { PRNG } from "./prng"

export interface FontDef {
    name: string
    category: string
    weights: number[]
    tags: string[]
}

export interface FontPairing {
    heading: FontDef
    body: FontDef
}

export type FontVibe = "modern" | "classic" | "tech" | "friendly" | "random"

export class FontGenerator {
    private prng: PRNG
    private fonts: FontDef[]

    constructor(seed: number | string) {
        this.prng = new PRNG(seed)
        this.fonts = fontsData as FontDef[]
    }

    generate(vibe: FontVibe = "random"): FontPairing {
        let candidates = this.fonts

        // Filter by vibe if not random
        if (vibe !== "random") {
            const filtered = this.fonts.filter((f) => f.tags.includes(vibe))
            if (filtered.length > 0) candidates = filtered
        }

        // Pick Heading
        // Headings are often Display, Serif, or Geometric Sans
        const headingCandidate = this.prng.pick(candidates)

        // Pick Body
        // Body should be readable (Sans or Serif), usually distinct from heading
        const bodyCandidates = this.fonts.filter(f =>
            f.name !== headingCandidate.name &&
            (f.category === "sans-serif" || f.category === "serif" || f.category === "monospace")
        )

        // Pairing Logic
        // If heading is Serif, body prefer Sans.
        // If heading is Display, body prefer Sans/Serif (neutral).
        // If heading is Sans, body can be Serif or different Sans.

        let validBodyObs = bodyCandidates
        if (headingCandidate.category === "serif") {
            const sans = bodyCandidates.filter(f => f.category === "sans-serif")
            if (sans.length > 0) validBodyObs = sans // Prefer contrast
        } else if (headingCandidate.category === "display") {
            const readable = bodyCandidates.filter(f => f.category !== "display")
            if (readable.length > 0) validBodyObs = readable
        }

        const bodyCandidate = this.prng.pick(validBodyObs) || headingCandidate

        return {
            heading: headingCandidate,
            body: bodyCandidate
        }
    }

    static getGoogleFontsUrl(pairing: FontPairing): string {
        // Construct Google Fonts URL
        // e.g. https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:wght@700&display=swap
        const families = [pairing.heading, pairing.body].map(font => {
            const weights = font.weights.join(";")
            return `family=${font.name.replace(/ /g, "+")}:wght@${weights}`
        })

        return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`
    }
}
