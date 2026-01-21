"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, MessageSquare, X, Send, Wallet, BookOpen, Terminal, BarChart3, Settings } from "lucide-react";
import { useState } from "react";
import { useMockWallet } from '@/components/WalletProvider';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackType, setFeedbackType] = useState<"bug" | "feature" | "other">("feature");

    const { address, isConnected, connect, disconnect } = useMockWallet();

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const links = [
        { name: "Overview", href: "/", icon: LayoutDashboard },
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Docs", href: "/docs", icon: BookOpen },
        { name: "Playground", href: "/playground", icon: Terminal },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <>
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 glass-panel rounded-lg text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:block fixed inset-y-0 left-0 z-40 w-64 glass-panel">
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-subtle bg-gradient-to-r from-neon/5 to-transparent">
                        <img src="/logo.png" alt="Cencera Logo" className="w-8 h-8 mr-3" />
                        <span className="text-xl font-bold tracking-tight text-white font-sans">
                            CENCERA
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {links.map((link, index) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.05,
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out group relative overflow-hidden font-mono text-sm ${isActive
                                            ? "text-zinc-100 bg-white/10 border border-white/10 shadow-lg shadow-white/5"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5"
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-gradient-to-r from-neon/10 to-transparent opacity-50"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-white" : "group-hover:scale-110"}`} />
                                        <span className="font-medium relative">{link.name}</span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* Wallet Section */}
                    <div className="px-4 pb-4">
                        <AnimatePresence mode="wait">
                            {isConnected && address ? (
                                <motion.div
                                    key="connected"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="space-y-2"
                                >
                                    <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neon/20 bg-neon/5 font-mono text-sm">
                                        <Wallet className="w-5 h-5 text-neon" />
                                        <span className="font-medium text-neon truncate">{formatAddress(address)}</span>
                                    </div>
                                    <button
                                        onClick={() => disconnect()}
                                        className="w-full px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/10"
                                    >
                                        Disconnect
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="disconnected"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    onClick={connect}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neon/20 bg-neon/5 hover:bg-neon/10 transition-all duration-300 font-mono text-sm text-neon"
                                >
                                    <Wallet className="w-5 h-5 text-neon" />
                                    <span className="font-medium">Connect Wallet</span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Feedback Section */}
                    <div className="px-4 pb-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowFeedback(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group font-mono text-sm text-zinc-400 hover:text-white"
                        >
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">Report issue</span>
                        </motion.button>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-subtle bg-black/20">
                        <div className="text-xs text-zinc-500 text-center font-mono">
                            <b>version: Alpha v0.0.4</b>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar with Animation */}
            <motion.div
                initial={false}
                animate={{ x: isOpen ? 0 : -256 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                }}
                className="md:hidden fixed inset-y-0 left-0 z-40 w-64 glass-panel"
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-subtle bg-gradient-to-r from-neon/5 to-transparent">
                        <img src="/logo.png" alt="Cencera Logo" className="w-8 h-8 mr-3" />
                        <span className="text-xl font-bold tracking-tight text-white font-sans">
                            CENCERA
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out group relative overflow-hidden font-mono text-sm ${isActive
                                        ? "text-zinc-100 bg-white/10 border border-white/10 shadow-lg shadow-white/5"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-neon/10 to-transparent opacity-50" />
                                    )}
                                    <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "text-white" : "group-hover:scale-110"}`} />
                                    <span className="font-medium relative">{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Wallet Section */}
                    <div className="px-4 pb-4">
                        {isConnected && address ? (
                            <div className="space-y-2">
                                <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neon/20 bg-neon/5 font-mono text-sm">
                                    <Wallet className="w-5 h-5 text-neon" />
                                    <span className="font-medium text-neon truncate">{formatAddress(address)}</span>
                                </div>
                                <button
                                    onClick={() => disconnect()}
                                    className="w-full px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/10"
                                >
                                    Disconnect
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={connect}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neon/20 bg-neon/5 hover:bg-neon/10 transition-all duration-300 font-mono text-sm text-neon"
                            >
                                <Wallet className="w-5 h-5 text-neon" />
                                <span className="font-medium">Connect Wallet</span>
                            </button>
                        )}
                    </div>

                    {/* Feedback Section */}
                    <div className="px-4 pb-4">
                        <button
                            onClick={() => setShowFeedback(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group font-mono text-sm text-zinc-400 hover:text-white"
                        >
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">Report issue</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-subtle bg-black/20">
                        <div className="text-xs text-zinc-500 text-center font-mono">
                            <b>version: alpha v0.4.1</b>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Feedback Modal */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                        >
                            <button
                                onClick={() => setShowFeedback(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-xl font-bold text-white mb-2 font-sans">Share Feedback</h3>
                            <p className="text-sm text-zinc-400 mb-6">Help us improve Cencera.</p>

                            <div className="space-y-4">
                                <div className="flex bg-zinc-800/50 p-1 rounded-lg">
                                    {(["bug", "feature", "other"] as const).map((type) => (
                                        <motion.button
                                            key={type}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setFeedbackType(type)}
                                            className={`flex-1 py-2 text-xs font-medium rounded-md capitalize transition-all duration-300 ${feedbackType === type
                                                ? "bg-white text-black shadow-sm"
                                                : "text-zinc-500 hover:text-zinc-300"
                                                }`}
                                        >
                                            {type}
                                        </motion.button>
                                    ))}
                                </div>

                                <textarea
                                    className="w-full h-32 bg-zinc-800/50 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent resize-none transition-all duration-300"
                                    placeholder="Tell us what you think..."
                                />

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowFeedback(false)}
                                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg"
                                >
                                    <Send className="w-4 h-4" /> Send Feedback
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
