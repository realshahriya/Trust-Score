import { ShieldCheck, ShieldAlert, BadgeHelp } from "lucide-react";
import { TrustGauge } from "@/components/TrustGauge";
import { useState, useEffect } from "react";

interface ActivityItem {
    id: string;
    type: 'wallet' | 'contract' | 'nft' | 'token';
    score: number;
    timestamp: string;
    status: 'safe' | 'risk' | 'warning';
}

// Helper to generate random activity
function generateRandomActivity(): ActivityItem[] {
    const types: ActivityItem['type'][] = ['wallet', 'contract', 'nft', 'token'];
    const names = [
        "Uniswap V3", "Tether USD", "Vitalik.eth", "Pepe", "0x892...Bad1",
        "Tornado Cash", "BoredApe #8821", "USDC", "Lido: stETH", "Arbitrum Bridge",
        "0x420...69", "OpenSea Registry", "Compound", "Aave V3", "MakerDAO"
    ];

    return Array.from({ length: 15 }).map((_, i) => {
        const type = types[Math.floor(Math.random() * types.length)];
        const score = Math.floor(Math.random() * 100);
        let status: ActivityItem['status'] = 'safe';

        if (score < 50) status = 'risk';
        else if (score < 80) status = 'warning';

        return {
            id: names[Math.floor(Math.random() * names.length)], // Mix of real names + random helps realism
            type,
            score,
            timestamp: `${Math.floor(Math.random() * 59) + 1}s ago`,
            status
        };
    }).sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)); // Sort by time (faked)
}

export function RecentActivity() {
    const [activity, setActivity] = useState<ActivityItem[]>([]);

    useEffect(() => {
        // Generate random activity on mount (client-side only to avoid hydration mismatch)
        setActivity(generateRandomActivity());

        // Optional: Add strict real-time updates? 
        // For now, "random with every load" is satisfied by initial generation.
    }, []);

    if (activity.length === 0) return null; // Or skeleton

    return (
        <div className="bg-cyber-card border border-cyber-border rounded-xl flex flex-col h-full">
            <div className="p-4 border-b border-cyber-border flex justify-between items-center bg-black/20">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <ActivityIcon className="w-5 h-5 text-trust-100" />
                    Live Validation Feed
                </h3>
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {activity.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="scale-100 origin-center">
                                <TrustGauge score={item.score} size={48} showLabel={false} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-zinc-200 group-hover:text-trust-100 transition-colors font-mono">
                                        {item.id}
                                    </span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase ${item.type === 'wallet' ? 'border-blue-500/30 text-blue-400' :
                                        item.type === 'contract' ? 'border-purple-500/30 text-purple-400' :
                                            item.type === 'token' ? 'border-yellow-500/30 text-yellow-400' : 'border-pink-500/30 text-pink-400'
                                        }`}>
                                        {item.type}
                                    </span>
                                </div>
                                <div className="text-xs text-zinc-500">{item.timestamp}</div>
                            </div>
                        </div>

                        <div className="text-right">
                            <StatusBadge status={item.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Icons helper
function ActivityIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'safe') return <ShieldCheck className="w-5 h-5 text-green-500" />;
    if (status === 'risk') return <ShieldAlert className="w-5 h-5 text-red-500" />;
    return <BadgeHelp className="w-5 h-5 text-yellow-500" />;
}
