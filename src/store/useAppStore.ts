import { create } from "zustand"
import { PaletteGenerator, type Palette, type PaletteConstraints } from "../engine/palette"
import { FontGenerator, type FontPairing, type FontVibe } from "../engine/fonts"

interface AppState {
    seed: number
    tab: "website" | "app" | "type" | "a11y"

    // Constraints
    paletteConstraints: PaletteConstraints
    fontVibe: FontVibe

    // Data
    palette: Palette
    fonts: FontPairing

    // Locks (Set of keys to lock)
    lockedRoles: Set<keyof Palette>
    lockedFonts: Set<keyof FontPairing> // 'heading' | 'body'

    // Actions
    setTab: (tab: AppState["tab"]) => void
    setPaletteConstraint: <K extends keyof PaletteConstraints>(key: K, value: PaletteConstraints[K]) => void
    setFontVibe: (vibe: FontVibe) => void
    togglePaletteLock: (key: keyof Palette) => void
    toggleFontLock: (key: keyof FontPairing) => void
    generate: () => void
    generatePalette: () => void
    generateFonts: () => void
    initFromUrl: () => void // TODO
}

export const useAppStore = create<AppState>((set, get) => {
    const initialSeed = Math.floor(Math.random() * 1000000)
    const pGen = new PaletteGenerator(initialSeed)
    const fGen = new FontGenerator(initialSeed)

    const initialConstraints: PaletteConstraints = {
        mode: "light",
        contrastStrategy: "AA",
        harmony: "analogous",
        saturation: "medium",
    }

    return {
        seed: initialSeed,
        tab: "website",
        paletteConstraints: initialConstraints,
        fontVibe: "modern",
        palette: pGen.generate(initialConstraints),
        fonts: fGen.generate("modern"),
        lockedRoles: new Set(),
        lockedFonts: new Set(),

        setTab: (tab) => set({ tab }),

        setPaletteConstraint: (key, value) => {
            set((state) => ({
                paletteConstraints: { ...state.paletteConstraints, [key]: value }
            }))
            // Auto-regenerate on constraint change? Or wait for user?
            // Usually better to wait or debounce. Let's wait for user or optional auto.
        },

        setFontVibe: (vibe) => set({ fontVibe: vibe }),

        togglePaletteLock: (key) => set((state) => {
            const newLocks = new Set(state.lockedRoles)
            if (newLocks.has(key)) newLocks.delete(key)
            else newLocks.add(key)
            return { lockedRoles: newLocks }
        }),

        toggleFontLock: (key) => set((state) => {
            const newLocks = new Set(state.lockedFonts)
            if (newLocks.has(key)) newLocks.delete(key)
            else newLocks.add(key)
            return { lockedFonts: newLocks }
        }),

        generate: () => {
            get().generatePalette()
            get().generateFonts()
        },

        generatePalette: () => {
            const state = get()
            const newSeed = Math.floor(Math.random() * 1000000)
            const pGen = new PaletteGenerator(newSeed)
            const newPalette = pGen.generate(state.paletteConstraints)

            set((state) => {
                const mergedPalette = { ...newPalette }
                // Apply locks
                state.lockedRoles.forEach(role => {
                    mergedPalette[role] = state.palette[role]
                })
                return { seed: newSeed, palette: mergedPalette }
            })
        },

        generateFonts: () => {
            const state = get()
            const newSeed = Math.floor(Math.random() * 1000000)
            const fGen = new FontGenerator(newSeed) // Use same seed? or new?
            const newFonts = fGen.generate(state.fontVibe)

            set((state) => {
                const mergedFonts = { ...newFonts }
                if (state.lockedFonts.has('heading')) mergedFonts.heading = state.fonts.heading
                if (state.lockedFonts.has('body')) mergedFonts.body = state.fonts.body
                return { fonts: mergedFonts }
            })
        },

        initFromUrl: () => {
            // Placeholder for URL hydration
        }
    }
})
