"use client";

import { Info, Bell, Shield, Eye, Database, Key, Sliders, Webhook, User } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    return (
        <div className="p-8 relative z-10 overflow-y-auto h-full text-zinc-100">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
                    <p className="text-zinc-400">Configure your trust engine, API keys, and surveillance preferences.</p>
                </div>

                {/* API Management */}
                <Section title="API Management" icon={Key}>
                    <div className="space-y-6">
                        <div className="p-4 bg-black/40 rounded-lg border border-cyber-border space-y-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-white">Production API Key</h3>
                                    <p className="text-sm text-zinc-500">Used for server-side requests. Keep secret.</p>
                                </div>
                                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded border border-green-500/20">ACTIVE</span>
                            </div>
                            <div className="flex gap-2">
                                <code className="flex-1 bg-black p-3 rounded border border-zinc-800 font-mono text-zinc-300 text-sm">
                                    sk_live_51M0...92xL
                                </code>
                                <button className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors text-sm">
                                    Copy
                                </button>
                                <button className="px-4 py-2 bg-red-500/10 text-red-400 font-bold rounded border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm">
                                    Roll Key
                                </button>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* SoftBlock Configuration */}
                <Section title="SoftBlock Configuration" icon={Sliders}>
                    <div className="space-y-6">
                        <div className="p-4 bg-black/40 rounded-lg border border-cyber-border space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-white">Risk Sensitivity Threshold</h3>
                                    <p className="text-sm text-zinc-500 max-w-lg">
                                        Entities with a Trust Score below this value will trigger a <span className="text-yellow-400 font-mono">SOFTBLOCK</span> response.
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-trust-100">75</span>
                                    <span className="text-sm text-zinc-500 ml-1">/ 100</span>
                                </div>
                            </div>
                            <input type="range" className="w-full accent-trust-100 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                            <div className="flex justify-between text-xs text-zinc-600 font-mono">
                                <span>LOOSE (20)</span>
                                <span>BALANCED (50)</span>
                                <span>STRICT (90)</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-cyber-border">
                                <div>
                                    <h3 className="font-medium text-zinc-200">Enforce Strict Mode</h3>
                                    <p className="text-xs text-zinc-500">Convert all SoftBlocks to Hard Blocks automatically.</p>
                                </div>
                                <Toggle />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-cyber-border">
                                <div>
                                    <h3 className="font-medium text-zinc-200">Include Simulation</h3>
                                    <p className="text-xs text-zinc-500">Run EVM simulation for every API call.</p>
                                </div>
                                <Toggle defaultChecked />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Webhooks & Alerts */}
                <Section title="Webhooks & Alerts" icon={Webhook}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Webhook URL</label>
                            <input
                                type="text"
                                placeholder="https://api.your-dapp.com/webhooks/trust-events"
                                className="w-full bg-black/40 border border-zinc-800 rounded p-3 text-sm text-white focus:border-trust-100 focus:outline-none placeholder-zinc-700"
                            />
                            <p className="text-xs text-zinc-500">We will send a POST request whenever a tracked entity's score changes by {'>'} 10%.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <button className="px-4 py-2 bg-trust-100/10 text-trust-100 font-bold rounded border border-trust-100/20 hover:bg-trust-100/20 transition-colors text-sm">
                                Send Test Event
                            </button>
                        </div>
                    </div>
                </Section>

                {/* Account */}
                <Section title="Account" icon={User}>
                    <div className="flex items-center gap-4 p-4 bg-black/40 rounded-lg border border-cyber-border">
                        <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xl">
                            RS
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-white">Real Shahriya</h3>
                            <p className="text-sm text-zinc-500">Enterprise Plan • admin@topay.foundation</p>
                        </div>
                        <button className="text-sm text-zinc-400 hover:text-white underline">Manage Billing</button>
                    </div>
                </Section>

                <div className="pt-8 border-t border-cyber-border text-center text-zinc-600 text-sm">
                    <p>TrustLayer v1.0.0 Alpha • Build 2025.12.22</p>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <section className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-cyber-border bg-white/5 flex items-center gap-3">
                <Icon className="w-5 h-5 text-trust-100" />
                <h2 className="font-bold text-lg text-white">{title}</h2>
            </div>
            <div className="p-6">
                {children}
            </div>
        </section>
    );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <button
            onClick={() => setChecked(!checked)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${checked ? 'bg-trust-100' : 'bg-zinc-700'}`}
        >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
    );
}
