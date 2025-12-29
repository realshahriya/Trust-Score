"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, Box, MessageSquare, X, Send } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackType, setFeedbackType] = useState<"bug" | "feature" | "other">("feature");

    const links = [
        { name: "Overview", href: "/", icon: LayoutDashboard },
        { name: "Demo", href: "/demo", icon: Box },
    ];

    return (
        <>
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 glass-panel rounded-lg text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className={`
        fixed inset-y-0 left-0 z-40 w-64 glass-panel
        transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-subtle bg-gradient-to-r from-neon/5 to-transparent">
                        <img src="/logo.png" alt="Cencera Logo" className="w-8 h-8 mr-3" />
                        <span className="text-xl font-bold tracking-tight text-white font-sans">
                            CENCERA
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden font-mono text-sm ${isActive
                                        ? "text-zinc-100 bg-white/10 border border-white/10"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-neon/10 to-transparent opacity-50" />
                                    )}
                                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`} />
                                    <span className="font-medium relative">{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Feedback Section */}
                    <div className="px-4 pb-4">
                        <button
                            onClick={() => setShowFeedback(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all group font-mono text-sm text-zinc-400 hover:text-white"
                        >
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Feedback</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-subtle bg-black/20">
                        <div className="text-xs text-zinc-500 text-center font-mono">
                            version: prototype
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Feedback Modal */}
            {showFeedback && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
                        <button
                            onClick={() => setShowFeedback(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-2 font-sans">Share Feedback</h3>
                        <p className="text-sm text-zinc-400 mb-6">Help us improve Cencera.</p>

                        <div className="space-y-4">
                            <div className="flex bg-zinc-800/50 p-1 rounded-lg">
                                {(["bug", "feature", "other"] as const).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFeedbackType(type)}
                                        className={`flex-1 py-2 text-xs font-medium rounded-md capitalize transition-all ${feedbackType === type
                                            ? "bg-white text-black shadow-sm"
                                            : "text-zinc-500 hover:text-zinc-300"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <textarea
                                className="w-full h-32 bg-zinc-800/50 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none"
                                placeholder="Tell us what you think..."
                            />

                            <button
                                onClick={() => setShowFeedback(false)}
                                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Send className="w-4 h-4" /> Send Feedback
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
