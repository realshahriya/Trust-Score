"use client";

import { useState } from "react";
import { Key, Plus, Trash2, Copy, Eye, EyeOff, ShieldAlert } from "lucide-react";

export default function ApiKeysPage() {
    return (
        <div className="p-8 space-y-8 max-w-6xl mx-auto text-zinc-100 relative z-10 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">API Keys</h1>
                    <p className="text-zinc-400">Manage your secret keys for accessing the TrustLayer API.</p>
                </div>
                <button className="px-4 py-2 bg-trust-100 text-black font-bold rounded hover:bg-trust-100/90 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create New Key
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Production Keys */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        Active Keys
                    </h2>

                    <div className="bg-cyber-card border border-cyber-border rounded-xl divide-y divide-white/5 overflow-hidden">
                        {[
                            { name: "Production App - US West", key: "pk_live_...9f2a", created: "2 days ago", lastUsed: "Just now" },
                            { name: "Staging Server", key: "pk_test_...8b1c", created: "1 month ago", lastUsed: "4 hours ago" },
                            { name: "Mobile App V2", key: "pk_live_...22xZ", created: "3 months ago", lastUsed: "12 mins ago" }
                        ].map((keyItem, i) => (
                            <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors group">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <Key className="w-4 h-4 text-trust-100" />
                                        {keyItem.name}
                                    </h3>
                                    <p className="text-xs text-zinc-500 font-mono">
                                        {keyItem.key} • Created {keyItem.created}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs text-zinc-400">Last used</p>
                                        <p className="text-sm font-bold text-white">{keyItem.lastUsed}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Advisory */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-yellow-500" />
                        Security
                    </h2>
                    <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-6 space-y-4">
                        <p className="text-sm text-zinc-300 leading-relaxed">
                            <strong className="text-white block mb-2">Never expose your keys.</strong>
                            Your API keys carry full privileges. Do not commit them to GitHub or expose them in client-side code.
                        </p>
                        <ul className="text-sm text-zinc-400 space-y-2 list-disc pl-4">
                            <li>Rotate keys every 90 days.</li>
                            <li>Use environment variables.</li>
                            <li>Restrict keys to specific IPs.</li>
                        </ul>
                        <button className="w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 rounded-lg font-bold transition-colors text-sm">
                            View Security Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
