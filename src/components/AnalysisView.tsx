"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { analyzeEntity } from '@/lib/analysisEngine';
import { EntityData } from '@/lib/mockData';
import { TrustGauge } from '@/components/TrustGauge';
import { RiskCard } from '@/components/RiskCard';
import { SocialSentiment } from '@/components/SocialSentiment';
import { Loader2, ShieldAlert, BadgeCheck, Copy, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalysisView() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || "Unknown";
    const chainId = searchParams.get('chain') || "1";

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
    }, [query]);

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
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <ShieldAlert className="w-16 h-16 text-red-500" />
                <h2 className="text-xl font-bold text-white">Analysis Failed</h2>
                <p className="text-zinc-400">{error}</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition">Retry</button>
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
                    {/* Risk Factors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.risks.map((risk, i) => (
                            <RiskCard key={i} {...risk} />
                        ))}
                    </div>

                    {/* Social Sentiment Chart */}
                    <SocialSentiment data={data.sentiment} />

                    {/* Raw Data Mock */}
                    <div className="bg-black/40 rounded-xl p-4 border border-cyber-border font-mono text-xs text-zinc-500 overflow-x-auto">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-zinc-400">Raw Signal Data</span>
                            <span className="bg-trust-100/10 text-trust-100 px-2 rounded">JSON</span>
                        </div>
                        <pre>
                            {JSON.stringify({
                                id: data.id,
                                type: data.type,
                                chainId: chainId,
                                metrics: {
                                    score: data.score,
                                    balance: data.marketData?.portfolioValueUsd || "0",
                                    mentions: data.mentionsCount || 0
                                },
                                risks: data.risks.map(r => r.title),
                                analysis_ts: new Date().toISOString()
                            }, null, 2)}
                        </pre>
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
        nft: "bg-pink-500/10 text-pink-400 border-pink-500/20"
    };
    // @ts-ignore
    const c = colors[type] || colors.wallet;

    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium border uppercase ${c}`}>
            {type}
        </span>
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
