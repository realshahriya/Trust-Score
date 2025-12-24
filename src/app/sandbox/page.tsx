"use client";

import { useState } from "react";
import { TrustGauge } from "@/components/TrustGauge";
import { SimulationEngine } from "@/components/SimulationEngine";
import { ShieldCheck, Activity, Copy, Check, ShieldAlert, AlertTriangle, Wallet, Flame, Globe, Lock, CheckCircle, Smartphone, Zap } from "lucide-react";

// Theme Definitions
const themes = {
    blue: { name: "Trust Blue", text: "text-trust-100", bg: "bg-trust-100", border: "border-trust-100", ring: "ring-trust-100", softBg: "bg-trust-100/10", softBorder: "border-trust-100/20", accent: "accent-trust-100" },
    purple: { name: "Cyber Purple", text: "text-purple-500", bg: "bg-purple-500", border: "border-purple-500", ring: "ring-purple-500", softBg: "bg-purple-500/10", softBorder: "border-purple-500/20", accent: "accent-purple-500" },
    green: { name: "Neon Green", text: "text-green-400", bg: "bg-green-400", border: "border-green-400", ring: "ring-green-400", softBg: "bg-green-400/10", softBorder: "border-green-400/20", accent: "accent-green-400" },
    orange: { name: "Warning Orange", text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500", ring: "ring-orange-500", softBg: "bg-orange-500/10", softBorder: "border-orange-500/20", accent: "accent-orange-500" },
    red: { name: "Crimson Red", text: "text-red-500", bg: "bg-red-500", border: "border-red-500", ring: "ring-red-500", softBg: "bg-red-500/10", softBorder: "border-red-500/20", accent: "accent-red-500" },
    pink: { name: "Hot Pink", text: "text-pink-500", bg: "bg-pink-500", border: "border-pink-500", ring: "ring-pink-500", softBg: "bg-pink-500/10", softBorder: "border-pink-500/20", accent: "accent-pink-500" },
    yellow: { name: "Solar Yellow", text: "text-yellow-400", bg: "bg-yellow-400", border: "border-yellow-400", ring: "ring-yellow-400", softBg: "bg-yellow-400/10", softBorder: "border-yellow-400/20", accent: "accent-yellow-400" },
    cyan: { name: "Cyan Future", text: "text-cyan-400", bg: "bg-cyan-400", border: "border-cyan-400", ring: "ring-cyan-400", softBg: "bg-cyan-400/10", softBorder: "border-cyan-400/20", accent: "accent-cyan-400" },
    indigo: { name: "Deep Indigo", text: "text-indigo-500", bg: "bg-indigo-500", border: "border-indigo-500", ring: "ring-indigo-500", softBg: "bg-indigo-500/10", softBorder: "border-indigo-500/20", accent: "accent-indigo-500" },
    teal: { name: "Teal Essence", text: "text-teal-400", bg: "bg-teal-400", border: "border-teal-400", ring: "ring-teal-400", softBg: "bg-teal-400/10", softBorder: "border-teal-400/20", accent: "accent-teal-400" },
};

type ThemeKey = keyof typeof themes;

export default function SandboxPage() {
    // --- STATE management for various modules ---

    // Module 1: Trust Engine
    const [score, setScore] = useState(85);
    const [safeThreshold, setSafeThreshold] = useState(80);
    const [riskThreshold, setRiskThreshold] = useState(50);
    const [gaugeCode, setGaugeCode] = useState("");

    // Module 2: Theming
    const [currentTheme, setCurrentTheme] = useState<ThemeKey>("blue");
    const theme = themes[currentTheme];

    // Module 3: Modals (Dapp Connection & Access Checks)
    const [activeModal, setActiveModal] = useState<string | null>(null);

    // Helpers
    const [copied, setCopied] = useState<string | null>(null);
    const handleCopy = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const updateGaugeCode = () => {
        const code = `<TrustGauge \n  score={${score}} \n  safeThreshold={${safeThreshold}} \n  riskThreshold={${riskThreshold}} \n/>`;
        setGaugeCode(code);
    };

    return (
        <div className="p-8 space-y-16 max-w-6xl mx-auto text-zinc-100 relative z-10 overflow-y-auto">

            {/* Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.softBg} ${theme.text} border ${theme.softBorder} text-xs font-bold uppercase tracking-wider transition-colors duration-300`}>
                    <Zap className="w-3 h-3" /> Interactive Playground
                </div>
                <h1 className="text-4xl font-bold text-white">Security Suite Sandbox</h1>
                <p className="text-zinc-400">
                    Experience the full capabilities of the TrustLayer protection ecosystem.
                    Configure algorithms, simulate threats, and test integration points.
                </p>

                {/* Theme Switcher */}
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                    {Object.entries(themes).map(([key, t]) => (
                        <button
                            key={key}
                            onClick={() => setCurrentTheme(key as ThemeKey)}
                            className={`w-8 h-8 rounded-full ${t.bg} ${currentTheme === key ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110" : "opacity-50 hover:opacity-100"} transition-all duration-200`}
                            title={`Set Theme: ${t.name}`}
                        />
                    ))}
                </div>
            </div>

            {/* PRODUCT 1: SCORES & ATTRIBUTES */}
            <section className="space-y-6">
                <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.softBorder} transition-colors duration-300`}>
                    <div className={`p-3 ${theme.softBg} rounded-xl border ${theme.softBorder} transition-colors duration-300`}>
                        <Activity className={`w-6 h-6 ${theme.text}`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">1. Scoring Engine</h2>
                        <p className="text-zinc-400 text-sm">Configure risk thresholds and visualize trust metrics.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className={`bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-6 hover:border-opacity-50 ${theme.softBorder} transition-all duration-300`}>
                            <div className="space-y-2">
                                <label className="flex justify-between text-sm font-bold text-zinc-300">
                                    <span>Simulation Score</span>
                                    <span className={`${theme.text} transition-colors duration-300`}>{score}/100</span>
                                </label>
                                <input
                                    type="range" min="0" max="100" value={score}
                                    onChange={(e) => setScore(Number(e.target.value))}
                                    className={`w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer ${theme.accent}`}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase group-hover:text-white transition-colors">Safe Zone</label>
                                    <input
                                        type="number" value={safeThreshold}
                                        onChange={(e) => setSafeThreshold(Number(e.target.value))}
                                        className={`w-full bg-black/40 border border-zinc-800 rounded-lg p-2 text-white text-sm focus:${theme.border} focus:ring-1 focus:${theme.ring} focus:outline-none transition-all duration-300`}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase group-hover:text-white transition-colors">Danger Zone</label>
                                    <input
                                        type="number" value={riskThreshold}
                                        onChange={(e) => setRiskThreshold(Number(e.target.value))}
                                        className={`w-full bg-black/40 border border-zinc-800 rounded-lg p-2 text-white text-sm focus:${theme.border} focus:ring-1 focus:${theme.ring} focus:outline-none transition-all duration-300`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-col items-center justify-center p-8 bg-black/20 border border-dashed rounded-xl relative ${theme.softBorder} transition-colors duration-300`}>
                        <div className="absolute top-4 right-4 text-xs text-zinc-600 font-mono">LIVE PREVIEW</div>
                        <TrustGauge score={score} size={180} safeThreshold={safeThreshold} riskThreshold={riskThreshold} />
                    </div>
                </div>
            </section>

            {/* PRODUCT 2: DAPP CONNECTION GUARD */}
            <section className="space-y-6">
                <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.softBorder} transition-colors duration-300`}>
                    <div className={`p-3 ${theme.softBg} rounded-xl border ${theme.softBorder} transition-colors duration-300`}>
                        <Globe className={`w-6 h-6 ${theme.text}`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">2. Dapp Connection Guard</h2>
                        <p className="text-zinc-400 text-sm">Simulate wallet connection events and phishing detection.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        onClick={() => setActiveModal('phishing')}
                        className={`bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/50 p-6 rounded-xl text-left transition-all group`}
                    >
                        <ShieldAlert className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Simulate Malicious Dapp</h3>
                        <p className="text-sm text-zinc-400 mt-2">Trigger a phishing warning intercepting a connection request.</p>
                    </button>

                    <button
                        onClick={() => setActiveModal('safe_connect')}
                        className={`${theme.softBg} hover:${theme.bg}/20 border ${theme.softBorder} hover:${theme.border} p-6 rounded-xl text-left transition-all duration-300 group`}
                    >
                        <Lock className={`w-8 h-8 ${theme.text} mb-4 group-hover:scale-110 transition-transform`} />
                        <h3 className="font-bold text-white">Verified Protocol</h3>
                        <p className="text-sm text-zinc-400 mt-2">Simulate a safe connection to a whitelisted DeFi protocol.</p>
                    </button>

                    <div className="p-6 rounded-xl bg-black/20 border border-zinc-800 flex items-center justify-center text-center">
                        <p className="text-zinc-500 text-sm">
                            <Smartphone className="w-6 h-6 mx-auto mb-2 opacity-50" />
                            This module is typically embedded in the mobile wallet SDK.
                        </p>
                    </div>
                </div>
            </section>

            {/* PRODUCT 3: TRANSACTION & ACCESS SIMULATOR */}
            <section className="space-y-6">
                <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.softBorder} transition-colors duration-300`}>
                    <div className={`p-3 ${theme.softBg} rounded-xl border ${theme.softBorder} transition-colors duration-300`}>
                        <Wallet className={`w-6 h-6 ${theme.text}`} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">3. Access & Transaction Simulator</h2>
                        <p className="text-zinc-400 text-sm">Deep inspection of contract calls and permission requests.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Live Engine Component */}
                    <div>
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <span className={`w-2 h-2 ${theme.bg} rounded-full animate-pulse`} /> Live Simulation Engine
                        </h3>
                        <div className="opacity-90 hover:opacity-100 transition-opacity">
                            {/* Reusing the robust simulation component */}
                            <SimulationEngine displayId="UNI Token" actualAddress="0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" isContract={true} />
                        </div>
                    </div>

                    {/* Permission Modals Triggers */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-white mb-4">Permission Checkers</h3>
                        <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-4">
                            <p className="text-sm text-zinc-400">
                                Test how the user is warned when a Dapp requests dangerous permissions.
                            </p>

                            <button
                                onClick={() => setActiveModal('wallet_api')}
                                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white">Unlimited Approval</div>
                                        <div className="text-xs text-zinc-400">Simulate "SetApprovalForAll" request</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded uppercase">
                                    High Risk
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveModal('gas')}
                                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg group transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500">
                                        <Flame className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white">Gas Spike</div>
                                        <div className="text-xs text-zinc-400">Simulate 150+ gwei environment</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-orange-500/20 text-orange-500 text-xs font-bold rounded uppercase">
                                    Network Risk
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MODAL RENDERER --- */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setActiveModal(null)}>
                    <div className={`relative w-full max-w-md p-6 bg-[#09090b] border ${theme.border} ring-1 ${theme.ring} ring-opacity-20 rounded-2xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200 transition-colors duration-300`} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                            <Check className="w-5 h-5 rotate-45" />
                        </button>

                        {/* Phishing Modal */}
                        {activeModal === 'phishing' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-red-600/50">
                                    <Globe className="w-8 h-8 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Dapp Connection Blocked</h3>
                                    <p className="text-zinc-400 mt-2">
                                        <strong>uniswap-secure-login.com</strong> is a known phishing domain.
                                    </p>
                                </div>
                                <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors">
                                    Reject Connection
                                </button>
                            </div>
                        )}

                        {/* Safe Connect Modal */}
                        {activeModal === 'safe_connect' && (
                            <div className="text-center space-y-4">
                                <div className={`w-16 h-16 ${theme.softBg} rounded-full flex items-center justify-center mx-auto ring-1 ${theme.softBorder}`}>
                                    <ShieldCheck className={`w-8 h-8 ${theme.text}`} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Safe to Connect</h3>
                                    <p className="text-zinc-400 mt-2">
                                        <strong>Uniswap V3 Protocol</strong> is verified and whitelisted.
                                    </p>
                                </div>
                                <button onClick={() => setActiveModal(null)} className={`w-full py-2.5 ${theme.bg} hover:opacity-90 text-black rounded-lg font-bold transition-all duration-300`}>
                                    Allow Access
                                </button>
                            </div>
                        )}

                        {/* Gas Modal */}
                        {activeModal === 'gas' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-orange-500/50">
                                    <Flame className="w-8 h-8 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">High Gas Fees</h3>
                                    <p className="text-zinc-400 mt-2">
                                        Current network cost is <strong>$45.20</strong> (150 gwei).
                                    </p>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setActiveModal(null)} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold transition-colors">
                                        Wait
                                    </button>
                                    <button onClick={() => setActiveModal(null)} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-400 text-black rounded-lg font-bold transition-colors">
                                        Pay Anyway
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Access/Permission Check Modal */}
                        {activeModal === 'wallet_api' && (
                            <div className="space-y-6">
                                <div className={`text-center border-b ${theme.softBorder} pb-4`}>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.softBg} ${theme.text} text-xs font-bold uppercase tracking-wider mb-3`}>
                                        <Wallet className="w-3 h-3" /> Approval Guard
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Permission Analysis</h3>
                                    <p className="text-sm text-zinc-400 mt-1">Reviewing request from <strong>Sus Protocol</strong>...</p>
                                </div>

                                <div className="space-y-4">
                                    {/* Permission Item 1 */}
                                    <div className="flex items-start gap-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <div className="p-2 bg-red-500/20 rounded-full text-red-500">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Full Access to USDC</h4>
                                            <p className="text-xs text-zinc-400 mt-0.5">Allows spending <strong>Unlimited USDC</strong> indefinitely.</p>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/10 text-center">
                                        <p className="text-xs text-yellow-200">
                                            <strong>Warning:</strong> This contract is unverified and less than 2 days old.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors mb-2">
                                        Reject Approval
                                    </button>
                                    <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-transparent hover:bg-white/5 text-zinc-500 rounded-lg text-xs font-medium transition-colors">
                                        I trust this dApp
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}
