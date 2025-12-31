import { Layout } from "@/components/layout/Layout"
import { Controls } from "@/components/studio/Controls"
import { PreviewCanvas } from "@/components/studio/PreviewCanvas"
import { Toaster } from "@/components/ui/sonner"
import { UrlSync } from "@/components/UrlSync"
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts"

function App() {
  return (
    <>
      <Layout controls={<Controls />}>
        <PreviewCanvas />
      </Layout>
      <UrlSync />
      <KeyboardShortcuts />
      <Toaster />
    </>
  )
}

export default App
