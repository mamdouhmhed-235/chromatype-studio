import { create } from "zustand"
import { PaletteGenerator, type Palette, type PaletteConstraints } from "../engine/palette"
import { FontGenerator, type FontPairing, type FontVibe } from "../engine/fonts"
import { TypographyGenerator, type TypeSystem, type TypographySettings } from "../engine/typography"

interface AppState {
    seed: number
    tab: "website" | "app" | "dashboard" | "type" | "a11y"

    // Constraints
    paletteConstraints: PaletteConstraints
    fontVibe: FontVibe
    typographySettings: TypographySettings

    // Data
    palette: Palette
    fonts: FontPairing
    typography: TypeSystem

    // Locks (Set of keys to lock)
    lockedRoles: Set<keyof Palette>
    lockedFonts: Set<keyof FontPairing> // 'heading' | 'body'

    // Actions
    setTab: (tab: AppState["tab"]) => void
    setPaletteConstraint: <K extends keyof PaletteConstraints>(key: K, value: PaletteConstraints[K]) => void
    setFontVibe: (vibe: FontVibe) => void
    setTypographySetting: <K extends keyof TypographySettings>(key: K, value: TypographySettings[K]) => void

    togglePaletteLock: (key: keyof Palette) => void
    toggleFontLock: (key: keyof FontPairing) => void

    generate: () => void
    generatePalette: () => void
    generateFonts: () => void
    generateTypography: () => void
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

    const initialTypographySettings: TypographySettings = {
        scale: "majorThird",
        baseSize: 16,
        lineHeight: "normal",
        letterSpacing: "normal"
    }

    return {
        seed: initialSeed,
        tab: "website",
        paletteConstraints: initialConstraints,
        fontVibe: "modern",
        typographySettings: initialTypographySettings,

        palette: pGen.generate(initialConstraints),
        fonts: fGen.generate("modern"),
        typography: TypographyGenerator.generate(initialTypographySettings),

        lockedRoles: new Set(),
        lockedFonts: new Set(),

        setTab: (tab) => set({ tab }),

        setPaletteConstraint: (key, value) => {
            set((state) => ({
                paletteConstraints: { ...state.paletteConstraints, [key]: value }
            }))
        },

        setFontVibe: (vibe) => set({ fontVibe: vibe }),

        setTypographySetting: (key, value) => {
            set((state) => {
                const newSettings = { ...state.typographySettings, [key]: value }
                return {
                    typographySettings: newSettings,
                    typography: TypographyGenerator.generate(newSettings)
                }
            })
        },

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
            // Typography usually doesn't need "regeneration" unless random, but effectively it's static config
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
            const fGen = new FontGenerator(newSeed)
            const newFonts = fGen.generate(state.fontVibe)

            set((state) => {
                const mergedFonts = { ...newFonts }
                if (state.lockedFonts.has('heading')) mergedFonts.heading = state.fonts.heading
                if (state.lockedFonts.has('body')) mergedFonts.body = state.fonts.body
                return { fonts: mergedFonts }
            })
        },

        generateTypography: () => {
            const state = get()
            set({ typography: TypographyGenerator.generate(state.typographySettings) })
        },

        initFromUrl: () => {
            // Placeholder
        }
    }
})
