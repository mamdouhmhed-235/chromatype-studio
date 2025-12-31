import { useAppStore } from "@/store/useAppStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, DollarSign, Activity, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardPreview() {
    const { palette, fonts } = useAppStore()

    // Inline styles for dynamic theming
    const style = {
        "--bg": palette.bg,
        "--surface": palette.surface,
        "--border": palette.border,
        "--text": palette.text,
        "--muted": palette.mutedText,
        "--primary": palette.primary,
        "--on-primary": palette.onPrimary,
        "--accent": palette.accent,
        "--on-accent": palette.onAccent,
        "--secondary": palette.secondary,
        "--success": palette.success,
        "--warning": palette.warning,
        "--error": palette.error,
        "--font-heading": fonts.heading.name,
        "--font-body": fonts.body.name,
        fontFamily: "var(--font-body), sans-serif",
        color: "var(--text)",
    } as React.CSSProperties

    return (
        <div className="w-full h-full p-8 overflow-y-auto bg-[var(--bg)]" style={style}>
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Analytics Overview</h1>
                        <p className="opacity-70 mt-1">Real-time data insights for your application.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" style={{ borderColor: "var(--border)", color: "var(--text)" }}>Export</Button>
                        <Button style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)" }}>Create Report</Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Revenue"
                        value="$45,231.89"
                        trend="+20.1%"
                        icon={<DollarSign className="w-4 h-4" />}
                        color="var(--primary)"
                    />
                    <StatCard
                        title="Active Users"
                        value="+2350"
                        trend="+180.1%"
                        icon={<Users className="w-4 h-4" />}
                        color="var(--accent)"
                    />
                    <StatCard
                        title="Sales"
                        value="+12,234"
                        trend="+19%"
                        icon={<BarChart3 className="w-4 h-4" />}
                        color="var(--secondary)"
                    />
                    <StatCard
                        title="Active Now"
                        value="+573"
                        trend="+201"
                        icon={<Activity className="w-4 h-4" />}
                        color="var(--success)"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {/* Main Chart Area */}
                    <Card className="md:col-span-4 shadow-none border-[var(--border)] bg-[var(--surface)]">
                        <CardHeader>
                            <CardTitle style={{ fontFamily: "var(--font-heading)" }}>Revenue Stream</CardTitle>
                            <CardDescription style={{ color: "var(--muted)" }}>Monthly revenue breakdown for the current fiscal year.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-end justify-between gap-2 pt-4">
                            {[40, 70, 45, 90, 65, 85, 55, 75, 60, 95, 80, 50].map((h, i) => (
                                <div key={i} className="w-full bg-[var(--primary)] opacity-20 hover:opacity-80 transition-all rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-[var(--text)] text-[var(--bg)] text-xs px-2 py-1 rounded transition-opacity">
                                        ${h * 1000}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Sales List */}
                    <Card className="md:col-span-3 shadow-none border-[var(--border)] bg-[var(--surface)]">
                        <CardHeader>
                            <CardTitle style={{ fontFamily: "var(--font-heading)" }}>Recent Transactions</CardTitle>
                            <CardDescription style={{ color: "var(--muted)" }}>You made 265 sales this month.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[
                                { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", initial: "OM" },
                                { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", initial: "JL" },
                                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", initial: "IN" },
                                { name: "William Kim", email: "will@email.com", amount: "+$99.00", initial: "WK" },
                                { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", initial: "SD" }
                            ].map((user, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium"
                                            style={{ backgroundColor: "var(--secondary)", color: "var(--bg)" }}>
                                            {user.initial}
                                        </div>
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-sm" style={{ color: "var(--muted)" }}>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="font-medium">{user.amount}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, trend, icon, color }: { title: string, value: string, trend: string, icon: any, color: string }) {
    return (
        <Card className="shadow-none border-[var(--border)] bg-[var(--surface)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium" style={{ fontFamily: "var(--font-heading)" }}>
                    {title}
                </CardTitle>
                <div style={{ color }}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs flex items-center gap-1 mt-1" style={{ color: "var(--muted)" }}>
                    <span className="text-[var(--success)] flex items-center">{trend} <ArrowUpRight className="w-3 h-3 ml-0.5" /></span> from last month
                </p>
            </CardContent>
        </Card>
    )
}
