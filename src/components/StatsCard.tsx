import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    description?: string;
}

export function StatsCard({ title, value, trend, trendUp, icon: Icon, description }: StatsCardProps) {
    return (
        <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 relative overflow-hidden group hover:border-trust-100/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon className="w-24 h-24 text-trust-100 transform rotate-12 -translate-y-4 translate-x-4" />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-trust-100/10 rounded-lg ring-1 ring-trust-100/20">
                        <Icon className="w-6 h-6 text-trust-100" />
                    </div>
                    {trend && (
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${trendUp
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}>
                            {trend}
                        </span>
                    )}
                </div>

                <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wide mb-1">{title}</h3>
                <div className="text-2xl font-bold text-white mb-2">{value}</div>
                {description && <p className="text-zinc-500 text-xs">{description}</p>}
            </div>
        </div>
    );
}
