import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Palette, Type, LayoutDashboard, Download, ArrowRight, Check } from "lucide-react"

const STEPS = [
    {
        title: "Welcome to Chromatype Studio",
        description: "Your AI-powered design lab for creating production-ready design systems.",
        icon: <Palette className="w-12 h-12 text-primary" />,
        content: "Stop guessing colors. Start generating valid, accessible design tokens that actually work together."
    },
    {
        title: "Control Every Detail",
        description: "Adjust harmonies, contrast, and typography.",
        icon: <Type className="w-12 h-12 text-accent" />,
        content: "Use the sidebar to tweak the algorithm. Set your 'Vibe', choose a harmony mode (Split-Complementary, Tetradic, etc.), and fine-tune your type scale."
    },
    {
        title: "Real-World Previews",
        description: "See your choices in action.",
        icon: <LayoutDashboard className="w-12 h-12 text-secondary" />,
        content: "Switch between 'Website', 'App UI', and the new 'Dashboard' tabs to verifying your system in data-dense and marketing contexts."
    },
    {
        title: "Export & Ship",
        description: "Get the code instantly.",
        icon: <Download className="w-12 h-12 text-success" />,
        content: "Click 'Export' to get CSS Variables, Tailwind Config, or a JSON file. Perfect for developer handoff."
    }
]

export function WelcomeTour() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(0)

    useEffect(() => {
        const hasSeenTour = localStorage.getItem("chromatype_onboarding_completed")
        if (!hasSeenTour) {
            // Small delay to let the app load first
            const timer = setTimeout(() => setOpen(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setStep(step + 1)
        } else {
            handleClose()
        }
    }

    const handleClose = () => {
        setOpen(false)
        localStorage.setItem("chromatype_onboarding_completed", "true")
    }

    const currentStep = STEPS[step]

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex flex-col items-center text-center space-y-4 pt-4">
                    <div className="p-4 rounded-full bg-muted/50 mb-2">
                        {currentStep.icon}
                    </div>
                    <DialogTitle className="text-2xl">{currentStep.title}</DialogTitle>
                    <DialogDescription className="text-base">
                        {currentStep.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 text-center text-muted-foreground text-sm">
                    {currentStep.content}
                </div>

                <DialogFooter className="flex-col sm:flex-col gap-2">
                    <Button onClick={handleNext} className="w-full gap-2">
                        {step === STEPS.length - 1 ? (
                            <>Get Started <Check className="w-4 h-4" /></>
                        ) : (
                            <>Next <ArrowRight className="w-4 h-4" /></>
                        )}
                    </Button>
                    <div className="flex justify-center gap-1 mt-2">
                        {STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-primary" : "w-1.5 bg-muted"}`}
                            />
                        ))}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
