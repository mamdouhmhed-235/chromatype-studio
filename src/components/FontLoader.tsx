import { useEffect } from "react"
import { useAppStore } from "../store/useAppStore"
import { FontGenerator } from "../engine/fonts"

export function FontLoader() {
    const fonts = useAppStore((state) => state.fonts)

    useEffect(() => {
        const linkId = "chromatype-fonts"
        let link = document.getElementById(linkId) as HTMLLinkElement

        if (!link) {
            link = document.createElement("link")
            link.id = linkId
            link.rel = "stylesheet"
            document.head.appendChild(link)
        }

        const url = FontGenerator.getGoogleFontsUrl(fonts)
        link.href = url
    }, [fonts])

    return null
}
