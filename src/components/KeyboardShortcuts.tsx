import { useEffect } from "react"
import { useAppStore } from "@/store/useAppStore"

export function KeyboardShortcuts() {
    const { generate, generatePalette, generateFonts } = useAppStore()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if input focused
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            if (e.code === "Space") {
                e.preventDefault()
                generate()
            }
            if (e.code === "KeyP") {
                generatePalette()
            }
            if (e.code === "KeyF") {
                generateFonts()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [generate, generatePalette, generateFonts])

    return null
}
