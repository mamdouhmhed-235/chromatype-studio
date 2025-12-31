import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Palette } from "@/engine/palette"
import type { FontPairing } from "@/engine/fonts"
import { useAppStore } from "@/store/useAppStore"
import { hexToHsl, toCssHsl } from "@/engine/color"
import { Copy } from "lucide-react"
import { toast } from "sonner"

function generateCss(palette: Palette, fonts: FontPairing) {
    return `:root {
  /* Colors */
  --background: ${toCssHsl(hexToHsl(palette.bg))};
  --foreground: ${toCssHsl(hexToHsl(palette.text))};
  --primary: ${toCssHsl(hexToHsl(palette.primary))};
  --primary-foreground: ${toCssHsl(hexToHsl(palette.onPrimary))};
  --secondary: ${toCssHsl(hexToHsl(palette.accent))};
  --secondary-foreground: ${toCssHsl(hexToHsl(palette.onAccent))};
  --muted: ${toCssHsl(hexToHsl(palette.surface))};
  --muted-foreground: ${toCssHsl(hexToHsl(palette.mutedText))};
  --accent: ${toCssHsl(hexToHsl(palette.accent))};
  --accent-foreground: ${toCssHsl(hexToHsl(palette.onAccent))};
  --destructive: ${toCssHsl(hexToHsl(palette.error))};
  --destructive-foreground: ${toCssHsl(hexToHsl(palette.onError))};
  --border: ${toCssHsl(hexToHsl(palette.border))};
  --input: ${toCssHsl(hexToHsl(palette.border))};
  --radius: 0.5rem;

  /* Typography */
  --font-heading: "${fonts.heading.name}", ${fonts.heading.category};
  --font-body: "${fonts.body.name}", ${fonts.body.category};
}`
}

function generateJson(palette: Palette, fonts: FontPairing) {
    return JSON.stringify({ palette, fonts }, null, 2)
}

function generateTailwind(_palette: Palette, _fonts: FontPairing) {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... add other roles
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      }
    }
  }
}`
}

export function ExportDrawer({ children }: { children: React.ReactNode }) {
    const { palette, fonts } = useAppStore()

    const css = generateCss(palette, fonts)
    const json = generateJson(palette, fonts)
    const tw = generateTailwind(palette, fonts)

    const copy = (text: string, type: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`Copied ${type} to clipboard`)
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-2xl">
                    <DrawerHeader>
                        <DrawerTitle>Export Tokens</DrawerTitle>
                        <DrawerDescription>Copy your generated palette and fonts.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-8">
                        <Tabs defaultValue="css">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="css">CSS Variables</TabsTrigger>
                                <TabsTrigger value="json">JSON</TabsTrigger>
                                <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                            </TabsList>
                            <TabsContent value="css" className="mt-4 relative">
                                <pre className="p-4 rounded-lg bg-muted text-xs overflow-auto max-h-[300px] border">
                                    {css}
                                </pre>
                                <Button size="icon" variant="secondary" className="absolute top-2 right-2" onClick={() => copy(css, "CSS")}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </TabsContent>
                            <TabsContent value="json" className="mt-4 relative">
                                <pre className="p-4 rounded-lg bg-muted text-xs overflow-auto max-h-[300px] border">
                                    {json}
                                </pre>
                                <Button size="icon" variant="secondary" className="absolute top-2 right-2" onClick={() => copy(json, "JSON")}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </TabsContent>
                            <TabsContent value="tailwind" className="mt-4 relative">
                                <pre className="p-4 rounded-lg bg-muted text-xs overflow-auto max-h-[300px] border">
                                    {tw}
                                </pre>
                                <Button size="icon" variant="secondary" className="absolute top-2 right-2" onClick={() => copy(tw, "Tailwind Config")}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
