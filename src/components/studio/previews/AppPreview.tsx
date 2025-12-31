import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"


export function AppPreview() {
    return (
        <div className="flex h-[600px] overflow-hidden bg-muted/20">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card p-4 hidden md:flex flex-col gap-2">
                <div className="mb-6 px-2 font-bold text-xl" style={{ fontFamily: "var(--font-heading)" }}>App.</div>
                {["Dashboard", "Projects", "Tasks", "Settings"].map((item, i) => (
                    <div key={item} className={`rounded-md px-3 py-2 text-sm font-medium cursor-pointer ${i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'}`}>
                        {item}
                    </div>
                ))}
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>Dashboard</h2>
                        <p className="text-muted-foreground">Overview of your activity.</p>
                    </div>
                    <Button>New Project</Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {[
                        { label: "Total Revenue", val: "$45,231.89", change: "+20.1%" },
                        { label: "Subscriptions", val: "+2350", change: "+180.1%" },
                        { label: "Sales", val: "+12,234", change: "+19%" },
                        { label: "Active Now", val: "+573", change: "+201" },
                    ].map((stat) => (
                        <Card key={stat.label}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.val}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.change} from last month
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Manage your preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="flex items-center space-x-4 rounded-md border p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Push Notifications
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Send notifications to device.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 rounded-md border p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Email Updates
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Receive daily digest.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Usage</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {["Database", "Storage", "Bandwidth"].map(resource => (
                                    <div key={resource} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>{resource}</span>
                                            <span className="text-muted-foreground">72%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-secondary">
                                            <div className="h-full bg-primary rounded-full" style={{ width: "72%" }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
