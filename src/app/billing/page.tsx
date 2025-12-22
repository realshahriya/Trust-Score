"use client";

import { CreditCard, CheckCircle, Zap, Download } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";

export default function BillingPage() {
    return (
        <div className="p-8 space-y-8 max-w-6xl mx-auto text-zinc-100 relative z-10 overflow-y-auto">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Billing & Plans</h1>
                <p className="text-zinc-400">Manage your subscription, payment methods, and usage limits.</p>
            </div>

            {/* Current Plan Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-gradient-to-br from-cyber-card to-black border border-cyber-border rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-trust-100/10 text-trust-100 border border-trust-100/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            Pro Plan
                        </span>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Enterprise Shield</h2>
                            <p className="text-zinc-400 text-sm">$499.00 / month • Renews on Jan 1, 2026</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-300">API Calls Usage</span>
                                    <span className="text-white font-mono">4.2M / 10M</span>
                                </div>
                                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-trust-100 w-[42%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-300">Storage (Logs)</span>
                                    <span className="text-white font-mono">125GB / 1TB</span>
                                </div>
                                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-purple-500 w-[12%]" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold transition-colors text-sm">
                                Change Plan
                            </button>
                            <button className="px-4 py-2 bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white rounded-lg font-bold transition-colors text-sm">
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-zinc-400" />
                            Payment Method
                        </h3>
                        <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5">
                            <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                                <span className="text-black font-bold text-[8px] tracking-tighter">VISA</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">•••• 4242</p>
                                <p className="text-xs text-zinc-500">Expires 12/28</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-2 mt-4 bg-trust-100/10 text-trust-100 border border-trust-100/20 hover:bg-trust-100/20 rounded-lg font-bold transition-colors text-sm">
                        Update Card
                    </button>
                </div>
            </div>

            {/* Invoices */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-cyber-border flex justify-between items-center bg-black/20">
                    <h3 className="font-bold text-white">Invoice History</h3>
                    <button className="text-xs text-trust-100 hover:text-white transition-colors">Download All</button>
                </div>
                <div className="divide-y divide-white/5">
                    {[
                        { id: "INV-2025-001", date: "Dec 1, 2025", amount: "$499.00", status: "Paid" },
                        { id: "INV-2025-002", date: "Nov 1, 2025", amount: "$499.00", status: "Paid" },
                        { id: "INV-2025-003", date: "Oct 1, 2025", amount: "$45.20", status: "Paid" },
                    ].map((inv) => (
                        <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-green-500/10 rounded-full text-green-500">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{inv.id}</p>
                                    <p className="text-xs text-zinc-500">{inv.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-mono text-white">{inv.amount}</span>
                                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-zinc-400 group-hover:bg-white/10 transition-colors">
                                    <Download className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
