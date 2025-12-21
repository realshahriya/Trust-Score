"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { analyzeEntity } from '@/lib/analysisEngine';
import { EntityData } from '@/lib/mockData';
import { TrustGauge } from '@/components/TrustGauge';
import { RiskCard } from '@/components/RiskCard';
import { SocialSentiment } from '@/components/SocialSentiment';
import { SimulationEngine } from '@/components/SimulationEngine';
import { Loader2, ShieldAlert, BadgeCheck, Copy, Database, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CHAIN_CONFIG: Record<string, { name: string, explorer: string }> = {
    "1": { name: "Ethereum Mainnet", explorer: "https://etherscan.io" },
    "56": { name: "BNB Smart Chain", explorer: "https://bscscan.com" },
    "137": { name: "Polygon", explorer: "https://polygonscan.com" },
    "43114": { name: "Avalanche C-Chain", explorer: "https://snowtrace.io" },
    "42161": { name: "Arbitrum One", explorer: "https://arbiscan.io" },
    "10": { name: "Optimism", explorer: "https://optimistic.etherscan.io" },
    "8453": { name: "Base", explorer: "https://basescan.org" },
    "324": { name: "zkSync Era", explorer: "https://explorer.zksync.io" },
    "59144": { name: "Linea", explorer: "https://lineascan.build" },
    "534352": { name: "Scroll", explorer: "https://scrollscan.com" },
    "81457": { name: "Blast", explorer: "https://blastscan.io" },
    "250": { name: "Fantom Opera", explorer: "https://ftmscan.com" },
    "25": { name: "Cronos", explorer: "https://cronoscan.com" },
    "100": { name: "Gnosis Chain", explorer: "https://gnosisscan.io" },
    "1284": { name: "Moonbeam", explorer: "https://moonscan.io" },
    "1313161554": { name: "Aurora", explorer: "https://explorer.aurora.dev" },
    "42220": { name: "Celo", explorer: "https://celoscan.io" },
    "1088": { name: "Metis", explorer: "https://andromeda-explorer.metis.io" },
    "5000": { name: "Mantle", explorer: "https://explorer.mantle.xyz" }
};

export default function AnalysisView() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || "Unknown";
    const chainId = searchParams.get('chain') || "1";
    const chainInfo = CHAIN_CONFIG[chainId] || { name: `Chain ID: ${chainId}`, explorer: "https://etherscan.io" };

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<EntityData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingStep, setLoadingStep] = useState(0);

    useEffect(() => {
        // Reset state
        setLoading(true);
        setError(null);
        setLoadingStep(0);

        // Start Loading Animation immediately
        const steps = [
            `Connecting to Chain ID ${chainId}...`,
            "Resolving ENS / Address...",
            "Scanning On-Chain History...",
            "Calculating Heuristic Score...",
            "Finalizing Trust Report..."
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            setLoadingStep(prev => prev + 1);
            stepIndex++;
        }, 800);

        // Fetch Data in parallel 
        analyzeEntity(query, chainId)
            .then(result => {
                // Ensure animation plays for at least 3 seconds
                setTimeout(() => {
                    clearInterval(interval);
                    setData(result);
                    setLoading(false);
                }, 3000);
            })
            .catch(err => {
                clearInterval(interval);
                setError("Could not analyze entity. Invalid address or network error.");
                setLoading(false);
            });

        return () => clearInterval(interval);
    }, [query, chainId]);

    if (loading) {
        const steps = [
            "Connecting to Blockchain Nodes...",
            "Resolving ENS / Address...",
            "Scanning On-Chain History...",
            "Calculating Heuristic Score...",
            "Finalizing Trust Report..."
        ];

        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-trust-100/20 blur-xl rounded-full animate-pulse"></div>
                    <Loader2 className="w-16 h-16 text-trust-100 animate-spin relative z-10" />
                </div>
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        AI Analysis in Progress
                    </h2>
                    <div className="h-6 overflow-hidden">
                        <motion.p
                            key={loadingStep}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-trust-100 font-mono text-sm"
                        >
                            {steps[Math.min(loadingStep, steps.length - 1)]}
                        </motion.p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl flex flex-col items-center max-w-md text-center">
                    <div className="p-4 bg-red-500/20 rounded-full mb-4">
                        <ShieldAlert className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Analysis Failed</h2>
                    <p className="text-zinc-400 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-500/20"
                    >
                        Retry Analysis
                    </button>
                </div>
            </div>
        );
    }

    if (!data) return <div>Failed to load data.</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-cyber-border pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-white">{data.id}</h1>
                        {data.score > 80 && <BadgeCheck className="w-6 h-6 text-trust-100" />}
                        <button className="p-1 hover:bg-white/10 rounded">
                            <Copy className="w-4 h-4 text-zinc-500" />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <Badge type={data.type} />
                        <span className="text-zinc-500 text-sm flex items-center gap-1">
                            <Database className="w-3 h-3 text-trust-100" /> Live Data
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ExplorerLink chainId={chainId} address={data.id} />
                    {data.score < 50 && (
                        <div className="px-4 py-2 bg-red-500/10 border border-red-500/50 rounded text-red-500 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5" />
                            <span>High Risk Entity</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Score & Summary */}
                <div className="space-y-6">
                    {/* Gauge */}
                    <div className="bg-cyber-card rounded-2xl p-8 border border-cyber-border flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-trust-100/50 to-transparent opacity-20" />
                        <TrustGauge score={data.score} size={240} />
                        <div className="mt-6 text-center">
                            <div className="text-2xl font-bold text-white mb-1">{data.label}</div>
                            <div className="text-sm text-zinc-500">Confidence: 99.8%</div>
                        </div>

                        {/* Hype Indicator */}
                        {data.hypeScore !== undefined && (
                            <div className="absolute top-4 right-4 flex flex-col items-end">
                                <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Hype</div>
                                <div className={`text-xl font-bold ${data.hypeScore > 50 ? 'text-trust-100' : 'text-zinc-400'}`}>
                                    {data.hypeScore}/100
                                </div>
                                <div className="text-[10px] text-zinc-600">
                                    {data.mentionsCount} mentions
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Summary */}
                    <div className="bg-cyber-card/50 rounded-xl p-6 border border-cyber-border">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">AI Summary</h3>
                            {data.marketData && (
                                <div className="text-xs text-trust-100 font-mono bg-trust-100/10 px-2 py-1 rounded border border-trust-100/20">
                                    Est. Value: ${data.marketData.portfolioValueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    {data.marketData.tokenPrice && (
                                        <span className="ml-2 border-l border-trust-100/20 pl-2 text-zinc-400">
                                            Price: ${data.marketData.tokenPrice.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="text-zinc-100 leading-relaxed font-mono text-sm border-l-2 border-trust-100 pl-4 py-1">
                            <FormattedText text={data.summary} />
                        </div>
                    </div>
                </div>

                {/* Right Col: Risks & Sentiment */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.risks.map((risk, i) => (
                            <RiskCard key={i} {...risk} />
                        ))}
                    </div>

                    {/* Transaction Simulator */}
                    <SimulationEngine address={data.id} isContract={data.type === 'contract' || data.type === 'token'} />

                    {/* Social Sentiment Chart */}
                    <SocialSentiment data={data.sentiment} />

                    {/* Explorer Data */}
                    <div className="bg-black/40 rounded-xl p-6 border border-cyber-border space-y-4">
                        <div className="flex items-center justify-between border-b border-cyber-border pb-4">
                            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
                                <Database className="w-4 h-4 text-trust-100" />
                                On-Chain Signals
                            </h3>
                            <span className="text-xs text-zinc-500 font-mono">{chainInfo.name}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div className="text-zinc-500">Address Type</div>
                            <div className="text-zinc-200 capitalize text-right font-medium">{data.type}</div>

                            <div className="text-zinc-500">Balance</div>
                            <div className="text-zinc-200 text-right font-mono">
                                {data.marketData?.portfolioValueUsd
                                    ? `$${data.marketData.portfolioValueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                                    : '0.00 ETH'
                                }
                            </div>

                            {data.type === 'token' && (
                                <>
                                    <div className="text-zinc-500">Token Standard</div>
                                    <div className="text-trust-100 text-right font-mono">ERC-20</div>

                                    <div className="text-zinc-500">Symbol</div>
                                    <div className="text-zinc-200 text-right font-bold">{data.id.split('(')[1]?.replace(')', '') || 'Unknown'}</div>
                                </>
                            )}

                            {data.type === 'contract' && (
                                <>
                                    <div className="text-zinc-500">Verification</div>
                                    <div className="text-zinc-400 text-right italic">Unknown Source</div>
                                </>
                            )}

                            <div className="text-zinc-500">Last Active</div>
                            <div className="text-zinc-200 text-right">Just now</div>
                        </div>

                        <div className="pt-4 mt-2 border-t border-cyber-border/50">
                            <a
                                href={`${chainInfo.explorer}/address/${data.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2 bg-white/5 hover:bg-white/10 rounded text-center text-xs text-zinc-400 hover:text-white transition-colors border border-white/5"
                            >
                                View full history on Explorer
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Badge({ type }: { type: string }) {
    const colors = {
        wallet: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        contract: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        nft: "bg-pink-500/10 text-pink-400 border-pink-500/20",
        token: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };
    // @ts-ignore
    const c = colors[type] || colors.wallet;

    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium border uppercase ${c}`}>
            {type}
        </span>
    );
}

function ExplorerLink({ chainId, address }: { chainId: string, address: string }) {
    const chainInfo = CHAIN_CONFIG[chainId] || CHAIN_CONFIG["1"];

    // Extract actual address from ID string if possible (mock data has "Name (0x..)")
    // If no parens, assume it's just the address
    const match = address.match(/\((0x[a-fA-F0-9]{40})\)/);
    const cleanAddress = match ? match[1] : (address.startsWith('0x') ? address : null);

    // Check if it's a valid address format to link, otherwise don't render or disable
    if (!cleanAddress) return null;

    return (
        <a
            href={`${chainInfo.explorer}/address/${cleanAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-zinc-400 hover:text-white transition-colors"
        >
            <span className="hidden md:inline">View on Explorer</span>
            <span className="md:hidden">Explorer</span>
            <ArrowUpRight className="w-3 h-3" />
        </a>
    );
}

function FormattedText({ text }: { text: string }) {
    // Basic Markdown Parser for **bold** text
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return (
        <p>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                }
                return <span key={index}>{part}</span>;
            })}
        </p>
    );
}
