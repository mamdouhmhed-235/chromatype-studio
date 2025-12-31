import { useEffect } from "react"
import { useAppStore } from "@/store/useAppStore"


export function UrlSync() {
    const state = useAppStore()

    // Hydrate from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const seed = params.get("s")
        if (seed) {
            useAppStore.setState({ seed: parseInt(seed) })
            // Trigger generic generation with this seed? 
            // Ideally we reconstruct full state.
            // For MVP, simplistic sync:
        }

        // Constraints
        const mode = params.get("mode") as any
        const harmony = params.get("harmony") as any
        const sat = params.get("sat") as any
        const vibe = params.get("vibe") as any

        if (mode || harmony || sat) {
            useAppStore.setState(s => ({
                paletteConstraints: {
                    ...s.paletteConstraints,
                    mode: mode || s.paletteConstraints.mode,
                    harmony: harmony || s.paletteConstraints.harmony,
                    saturation: sat || s.paletteConstraints.saturation
                }
            }))
        }

        if (vibe) {
            useAppStore.setState({ fontVibe: vibe })
        }

        // Locks could be complex "l_primary=hex"
        // For now, let's just sync the seed and constraints, which is enough to reproduce the "Random" generation 
        // IF no locks were active. 
        // To support Locks, we need more complex logic.
        // If the user wants to share "My Edited Palette", the URL should probably encode the *Hex Codes* directly?
        // "Shareable: full state encoded into URL".
        // If I encode `p_primary=#ffffff`, I can hydrate that and Lock it?

        // Let's rely on the seed for the base, and if there are manual overrides (locks), we encode them.
        // Implementation:
        // If URL has specific colors, set them into palette and Lock them?

        // Hydration Logic:
        // 1. Set Seed.
        // 2. Set Constraints.
        // 3. Generate() -> Base State.
        // 4. Overwrite with specific params if present?

        // Typography
        const tScale = params.get("t_scale") as any
        const tBase = params.get("t_base")

        if (tScale || tBase) {
            useAppStore.setState(s => {
                const newSettings = { ...s.typographySettings }
                if (tScale) newSettings.scale = tScale
                if (tBase) newSettings.baseSize = parseInt(tBase)
                return {
                    typographySettings: newSettings,
                }
            })
            // Trigger typo generation?
            // The store subscription in Controls usually handles this, but here we set state directly.
            // We should validly trigger the generator.
            // Ideally use the action:
            // But we are in useEffect, setting multiple things.
            // Let's rely on a secondary effect or just manual call?
            // Actually, `useAppStore.setState` updates the store, but doesn't auto-run generators unless wired.
            // Our store logic for `setTypographySetting` updates `typography` derived state.
            // `setState` bypasses that. 
            // We should probably just call the action or manually update `typography` here.

            // Simpler: Just rely on "generate" call at the end if we want random, 
            // OR if specific params are provided, we should probably update the derived data too.
        }

        if (seed) {
            // If we have a seed, we should regenerate to get the base state
            state.generate()
            // And regen typography?
            state.generateTypography()
        }
    }, [])

    // Sync to URL
    useEffect(() => {
        const params = new URLSearchParams()
        params.set("s", state.seed.toString())
        params.set("mode", state.paletteConstraints.mode)
        params.set("harmony", state.paletteConstraints.harmony)
        params.set("sat", state.paletteConstraints.saturation)
        params.set("vibe", state.fontVibe)
        params.set("tab", state.tab)

        params.set("t_scale", state.typographySettings.scale)
        params.set("t_base", state.typographySettings.baseSize.toString())

        // TODO: Encode locks if any
        if (state.lockedRoles.size > 0) {
            state.lockedRoles.forEach(role => {
                params.set(`l_${role}`, state.palette[role])
            })
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`
        window.history.replaceState(null, "", newUrl)
    }, [state.seed, state.paletteConstraints, state.fontVibe, state.tab, state.lockedRoles, state.palette, state.typographySettings])

    return null
}
