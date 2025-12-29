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
        <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-white/10">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                    <Icon className="w-5 h-5 text-zinc-300" />
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

            <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</h3>
            <div className="text-2xl font-bold text-white mb-1 font-sans">{value}</div>
            {description && <p className="text-zinc-600 text-xs font-sans">{description}</p>}
        </div>
    );
}
