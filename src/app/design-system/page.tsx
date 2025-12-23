"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Play, Shield, ShieldAlert, BadgeHelp, Flame, Globe, TrendingUp, Info, Lock, Unplug, Flag, Wallet } from "lucide-react";
// ... (omitting lines for brevity is not allowed in ReplaceFileContent unless utilizing separate instructions, but here I can't do multiple disjoint edits easily without multi_replace. However, I can just do two tool calls or one if the lines are close. They are far apart (imports at top, buttons at line ~70).
// Wait, I can't do two disjoint edits in one `replace_file_content`.
// I will use `multi_replace_file_content`.

// Actually, I'll just use `replace_file_content` for imports first, then another for the button. Or use `multi_replace_file_content`.
// `multi_replace_file_content` is safer.
import { TrustGauge } from "@/components/TrustGauge";
import { RecentActivity } from "@/components/RecentActivity";
import { ThreatMap } from "@/components/ThreatMap";
import { SimulationEngine } from "@/components/SimulationEngine";

export default function DesignSystemPage() {
    const [modal, setModal] = useState<string | null>(null);

    return (
        <div className="p-8 relative z-10 overflow-y-auto h-full text-zinc-100 max-w-6xl mx-auto space-y-12">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Design System & UI Tests</h1>
                <p className="text-zinc-400">Kitchen sink for testing all UI components, interactions, and popups.</p>
            </div>

            {/* ... previous sections ... */}

            {/* Complex Modules */}
            <Section title="Live Dashboard Modules">
                <div className="space-y-8">
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Threat Map Visualization</h4>
                        <div className="h-[300px] w-full">
                            <ThreatMap />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Activity Feed</h4>
                            <div className="h-[400px]">
                                <RecentActivity />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-4">Simulation Engine (Demo)</h4>
                            {/* Passing a Vitalik address and isContract=false for demo purposes */}
                            <SimulationEngine address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" isContract={false} />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ... Modals section ... */}

            {/* Colors & Typhography */}
            <Section title="Brand Colors">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorCard name="Neon Blue" class="bg-neon" text="#00F0FF" />
                    <ColorCard name="Surface" class="bg-surface" text="#0A0A0A" />
                    <ColorCard name="Success" class="bg-green-500" />
                    <ColorCard name="Error" class="bg-red-500" />
                    <ColorCard name="Warning" class="bg-yellow-500" />
                    <ColorCard name="Background" class="bg-black" />
                </div>
            </Section>

            {/* Buttons */}
            <Section title="Interactive Elements (Buttons)">
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary">Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="danger">Destructive</Button>
                    <Button variant="primary" icon={Play}>Run Simulation</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <div onClick={() => setModal('report')}>
                        <Button variant="outline" icon={Flag}>Report Entity</Button>
                    </div>
                </div>
            </Section>

            {/* Badges & Status */}
            <Section title="Badges & Indicators">
                <div className="flex flex-wrap gap-4 items-center">
                    <Badge type="token" />
                    <Badge type="contract" />
                    <Badge type="wallet" />
                    <Badge type="nft" />
                    <div className="h-8 w-[1px] bg-zinc-700" />
                    <StatusBadge status="safe" />
                    <StatusBadge status="risk" />
                    <StatusBadge status="warning" />
                </div>
            </Section>

            {/* Data Visualization */}
            <Section title="Data Visualization (Trust Gauge)">
                <div className="flex flex-wrap gap-8 items-center bg-black/20 p-6 rounded-xl">
                    <TrustGauge score={98} size={120} />
                    <TrustGauge score={45} size={80} />
                    <TrustGauge score={10} size={64} showLabel={false} />
                    <div className="animate-pulse">
                        <TrustGauge score={75} size={48} showLabel={false} />
                    </div>
                </div>
            </Section>

            {/* Typography */}
            <Section title="Typography">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-white">Heading 1</h1>
                            <h2 className="text-3xl font-bold text-white">Heading 2</h2>
                            <h3 className="text-2xl font-bold text-white">Heading 3</h3>
                            <h4 className="text-xl font-bold text-white">Heading 4</h4>
                        </div>
                        <div className="space-y-4">
                            <p className="text-zinc-100">
                                <strong className="text-white block mb-1">Body Text</strong>
                                The quick brown fox jumps over the lazy dog. Comprehensive trust analysis requires deep history scanning and real-time simulation.
                            </p>
                            <p className="text-zinc-400 text-sm">
                                <strong className="text-white block mb-1">Small / Secondary</strong>
                                Metadata strings, timestamps (2025-12-22), and helper text often use this muted style.
                            </p>
                            <code className="bg-black/50 px-2 py-1 rounded text-trust-100 font-mono text-sm border border-trust-100/20">
                                0x123...abc
                            </code>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Form Controls */}
            <Section title="Form Controls">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Input Field</label>
                            <input
                                type="text"
                                placeholder="Enter address..."
                                className="w-full bg-black/40 border border-zinc-800 rounded-lg p-3 text-white focus:border-trust-100 focus:outline-none focus:ring-1 focus:ring-trust-100/50 transition-all placeholder-zinc-700"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Search (Glass)</label>
                            <input
                                type="text"
                                placeholder="Search entity..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-trust-100/50 focus:bg-black/50 focus:outline-none transition-all placeholder-zinc-600"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-cyber-border">
                            <span className="text-zinc-300 font-medium">Toggle Switch</span>
                            <div className="w-12 h-6 rounded-full bg-trust-100 p-1 flex justify-end cursor-pointer"><div className="w-4 h-4 bg-white rounded-full shadow-sm" /></div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-cyber-border opacity-50">
                            <span className="text-zinc-500 font-medium">Disabled Toggle</span>
                            <div className="w-12 h-6 rounded-full bg-zinc-700 p-1 cursor-not-allowed"><div className="w-4 h-4 bg-zinc-500 rounded-full shadow-sm" /></div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Cards & Containers */}
            <Section title="Cards & Containers">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
                        <h4 className="text-lg font-bold text-white mb-2">Standard Card</h4>
                        <p className="text-zinc-400 text-sm">Default background with subtle border. Used for dashboard widgets.</p>
                    </div>
                    <div className="bg-gradient-to-br from-trust-100/10 to-transparent border border-trust-100/20 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-trust-100" />
                            <h4 className="text-lg font-bold text-white">Feature Card</h4>
                        </div>
                        <p className="text-trust-100/80 text-sm">Highlighted sections needing emphasis.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                        <h4 className="text-lg font-bold text-white mb-2">Glass Panel</h4>
                        <p className="text-zinc-400 text-sm">Used for overlays, floating menus, and HUD elements.</p>
                    </div>
                </div>
            </Section>

            {/* Feedback & Loading */}
            <Section title="Feedback & Loading">
                <div className="flex items-center gap-12">
                    <div className="text-center space-y-2">
                        <div className="w-8 h-8 rounded-full border-2 border-trust-100 border-t-transparent animate-spin mx-auto" />
                        <p className="text-xs text-zinc-500 font-mono">SPINNER</p>
                    </div>
                    <div className="space-y-2 w-48">
                        <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
                        <div className="h-4 bg-zinc-800 rounded animate-pulse w-1/2" />
                        <p className="text-xs text-zinc-500 font-mono mt-2">SKELETON</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-trust-100 animate-ping" />
                        <span className="w-2 h-2 rounded-full bg-trust-100" />
                        <p className="text-xs text-zinc-500 font-mono ml-2">LIVE PING</p>
                    </div>
                </div>
            </Section>

            {/* Code & Terminal */}
            <Section title="Code & Terminal">
                <div className="bg-[#0D0D11] border border-cyber-border rounded-xl overflow-hidden font-mono text-sm">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-cyber-border text-xs text-zinc-500">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                        </div>
                        <span className="ml-2">bash</span>
                    </div>
                    <div className="p-4 space-y-1">
                        <div className="flex gap-2">
                            <span className="text-green-400">$</span>
                            <span className="text-zinc-300">npm install @trustlayer/sdk</span>
                        </div>
                        <div className="text-zinc-500">Installing dependencies...</div>
                        <div className="text-trust-100">✓ Done in 1.4s</div>
                    </div>
                </div>
            </Section>

            {/* Modals & Popups */}
            <Section title="Modals & Popups (Test Triggers)">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        onClick={() => setModal('softblock')}
                        className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl cursor-pointer hover:bg-yellow-500/20 transition-all group"
                    >
                        <AlertTriangle className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Trigger SoftBlock Warning</h3>
                        <p className="text-sm text-zinc-400 mt-2">Simulate a suspicious entity popup.</p>
                    </div>

                    <div
                        onClick={() => setModal('block')}
                        className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl cursor-pointer hover:bg-red-500/20 transition-all group"
                    >
                        <XCircle className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Trigger Hard Block</h3>
                        <p className="text-sm text-zinc-400 mt-2">Simulate a verified threat popup.</p>
                    </div>

                    <div
                        onClick={() => setModal('success')}
                        className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl cursor-pointer hover:bg-green-500/20 transition-all group"
                    >
                        <CheckCircle className="w-8 h-8 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Trigger Success State</h3>
                        <p className="text-sm text-zinc-400 mt-2">Simulate a safe transaction verification.</p>
                    </div>

                    <div onClick={() => setModal('gas')} className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl cursor-pointer hover:bg-orange-500/20 transition-all group">
                        <Flame className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Gas Spike Warning</h3>
                        <p className="text-sm text-zinc-400 mt-2">Precautions for high network congestion.</p>
                    </div>

                    <div onClick={() => setModal('phishing')} className="p-6 bg-red-600/10 border border-red-600/20 rounded-xl cursor-pointer hover:bg-red-600/20 transition-all group">
                        <Globe className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Phishing Warning</h3>
                        <p className="text-sm text-zinc-400 mt-2">Suspicious URL mismatch alert.</p>
                    </div>

                    <div onClick={() => setModal('unverified')} className="p-6 bg-slate-500/10 border border-slate-500/20 rounded-xl cursor-pointer hover:bg-slate-500/20 transition-all group">
                        <Unplug className="w-8 h-8 text-slate-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Unverified Contract</h3>
                        <p className="text-sm text-zinc-400 mt-2">Source code verification missing.</p>
                    </div>

                    <div onClick={() => setModal('slippage')} className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl cursor-pointer hover:bg-purple-500/20 transition-all group">
                        <TrendingUp className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">High Slippage</h3>
                        <p className="text-sm text-zinc-400 mt-2">Price impact &gt; 5% warning.</p>
                    </div>

                    <div onClick={() => setModal('approval')} className="p-6 bg-yellow-600/10 border border-yellow-600/20 rounded-xl cursor-pointer hover:bg-yellow-600/20 transition-all group">
                        <Lock className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Unlimited Approval</h3>
                        <p className="text-sm text-zinc-400 mt-2">Token allowance risk check.</p>
                    </div>

                    <div onClick={() => setModal('wallet_api')} className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl cursor-pointer hover:bg-blue-500/20 transition-all group md:col-span-3">
                        <Wallet className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-white">Wallet Permission Guard</h3>
                        <p className="text-sm text-zinc-400 mt-2">Simulate real-time dApp permission analysis for wallets.</p>
                    </div>
                </div>
            </Section>

            {/* Modal Overlay */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setModal(null)}>
                    <div className="relative w-full max-w-md p-6 bg-[#09090b] border border-zinc-800 rounded-2xl shadow-2xl scale-100 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>

                        {/* Close Button */}
                        <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                            <XCircle className="w-5 h-5" />
                        </button>

                        {/* Modal Content */}
                        {modal === 'softblock' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-yellow-500/50">
                                    <AlertTriangle className="w-8 h-8 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Security Warning</h3>
                                    <p className="text-zinc-400 mt-2">
                                        This contract has been flagged for <strong>Low Liquidity</strong> and <strong>Suspicious Proxy Pattern</strong>.
                                    </p>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold transition-colors">
                                        Go Back
                                    </button>
                                    <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-bold transition-colors">
                                        Proceed Anyway
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'block' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-red-500/50">
                                    <ShieldAlert className="w-8 h-8 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Transaction Blocked</h3>
                                    <p className="text-zinc-400 mt-2">
                                        This address belongs to a known <strong>Phishing Group</strong>. The transaction has been halted for your safety.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-red-500 hover:bg-red-400 text-white rounded-lg font-bold transition-colors">
                                        Close Safety Lock
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'success' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-green-500/50">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Verification Passed</h3>
                                    <p className="text-zinc-400 mt-2">
                                        Entity has a Trust Score of <strong>98/100</strong>. No known risks detected.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-black rounded-lg font-bold transition-colors">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'gas' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-orange-500/50">
                                    <Flame className="w-8 h-8 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">High Gas Fees Detected</h3>
                                    <p className="text-zinc-400 mt-2">
                                        Network congestion is high (150 gwei). This transaction will cost approx <strong>$45.20</strong>.
                                    </p>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold transition-colors">
                                        Wait No
                                    </button>
                                    <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-400 text-black rounded-lg font-bold transition-colors">
                                        Pay Anyway
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'phishing' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-red-600/50">
                                    <Globe className="w-8 h-8 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Phishing Alert</h3>
                                    <p className="text-zinc-400 mt-2">
                                        You are interacting with <strong>uniswap-secure-login.com</strong> which mimics a known service.
                                    </p>
                                </div>
                                <div className="pt-4 space-y-2">
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors">
                                        Abort Transaction
                                    </button>
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-transparent hover:bg-white/5 text-zinc-500 rounded-lg text-xs font-medium transition-colors">
                                        I know what I am doing
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'unverified' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-slate-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-slate-500/50">
                                    <Unplug className="w-8 h-8 text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Unverified Contract</h3>
                                    <p className="text-zinc-400 mt-2">
                                        The functionality of this contract is hidden. It may contain malicious code.
                                    </p>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold transition-colors">
                                        Go Back
                                    </button>
                                    <button onClick={() => setModal(null)} className="flex-1 py-2.5 bg-slate-200 hover:bg-white text-black rounded-lg font-bold transition-colors">
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'slippage' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-purple-500/50">
                                    <TrendingUp className="w-8 h-8 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">High Slippage Warning</h3>
                                    <p className="text-zinc-400 mt-2">
                                        You will lose <strong>12.5%</strong> of your tokens due to low liquidity.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-bold transition-colors">
                                        Accept 12.5% Loss
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'approval' && (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-yellow-600/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-yellow-600/50">
                                    <Lock className="w-8 h-8 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Unlimited Approval Request</h3>
                                    <p className="text-zinc-400 mt-2">
                                        This site is requesting access to <strong>ALL</strong> of your USDC.
                                    </p>
                                </div>
                                <div className="space-y-2 pt-4">
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg font-bold transition-colors">
                                        Edit Limit
                                    </button>
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-bold transition-colors">
                                        Approve Unlimited
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'report' && (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Flag className="w-6 h-6 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Report Entity</h3>
                                    <p className="text-sm text-zinc-400">Flag this address for immediate review.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Target Address</label>
                                        <div className="p-3 bg-black/40 border border-zinc-800 rounded-lg text-zinc-400 font-mono text-sm">
                                            0x123...456abc
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Reason</label>
                                        <select className="w-full bg-black/40 border border-zinc-800 rounded-lg p-3 text-white focus:border-trust-100 outline-none text-sm">
                                            <option>Phishing / Fake Site</option>
                                            <option>Rug Pull / Scam</option>
                                            <option>Malicious Contract</option>
                                            <option>Honeypot</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-500 uppercase">Evidence / Notes</label>
                                        <textarea
                                            className="w-full bg-black/40 border border-zinc-800 rounded-lg p-3 text-white focus:border-trust-100 outline-none text-sm min-h-[80px]"
                                            placeholder="Describe the malicious behavior..."
                                        />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-trust-100 hover:bg-trust-100/90 text-black rounded-lg font-bold transition-colors">
                                        Submit Report
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal === 'wallet_api' && (
                            <div className="space-y-6">
                                <div className="text-center border-b border-cyber-border pb-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                                        <Wallet className="w-3 h-3" /> API Feature Preview
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Transaction Breakdown</h3>
                                    <p className="text-sm text-zinc-400 mt-1">What <strong>Uniswap V3</strong> is actually asking for:</p>
                                </div>

                                <div className="space-y-4">
                                    {/* Permission Item 1 */}
                                    <div className="flex items-start gap-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <div className="p-2 bg-red-500/20 rounded-full text-red-500">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Full Access to USDC</h4>
                                            <p className="text-xs text-zinc-400 mt-0.5">Allows this contract to spend <strong>Unlimited USDC</strong> from your wallet at any time.</p>
                                        </div>
                                    </div>

                                    {/* Permission Item 2 */}
                                    <div className="flex items-start gap-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <div className="p-2 bg-green-500/20 rounded-full text-green-500">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white">Verified Contract</h4>
                                            <p className="text-xs text-zinc-400 mt-0.5">Contract 0x1f9...123 matches the official Uniswap Router bytecode.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 text-center">
                                    <p className="text-xs text-blue-300">
                                        <strong>For Wallet Developers:</strong> Integrate this "Pre-Sign Analysis" API to protect your users from malicious approvals.
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <button onClick={() => setModal(null)} className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold transition-colors">
                                        Close Preview
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

// Helpers
function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <section className="space-y-6 border-b border-cyber-border pb-12">
            <h2 className="text-xl font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-trust-100"></span>
                {title}
            </h2>
            {children}
        </section>
    );
}

function ColorCard({ name, class: className, text }: { name: string, class: string, text?: string }) {
    return (
        <div className="p-3 bg-black/20 rounded-lg border border-cyber-border">
            <div className={`h-12 w-full rounded-md mb-2 ${className}`}></div>
            <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-300 font-bold">{name}</span>
                {text && <span className="text-zinc-500 font-mono">{text}</span>}
            </div>
        </div>
    );
}

function Button({ variant, icon: Icon, children }: { variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger', icon?: any, children: React.ReactNode }) {
    const base = "px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 text-sm";
    const variants = {
        primary: "bg-neon text-black hover:bg-white shadow-[0_0_15px_-3px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_-3px_rgba(0,240,255,0.5)] transition-all duration-200",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        outline: "border border-white/20 text-zinc-300 hover:border-white/40 hover:text-white",
        ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
    };

    return (
        <button className={`${base} ${variants[variant]}`}>
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
}

function Badge({ type }: { type: string }) {
    const colors: Record<string, string> = {
        wallet: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        contract: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        nft: "bg-pink-500/10 text-pink-400 border-pink-500/20",
        token: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium border uppercase ${colors[type]}`}>
            {type}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'safe') return <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase"><CheckCircle className="w-3 h-3" /> Safe</div>;
    if (status === 'risk') return <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase"><ShieldAlert className="w-3 h-3" /> Risk</div>;
    return <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase"><BadgeHelp className="w-3 h-3" /> Warning</div>;
}
