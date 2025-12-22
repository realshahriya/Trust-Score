"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LayoutDashboard, Database, CreditCard, BookOpen, Settings, Menu, Palette, Box } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Overview", href: "/", icon: LayoutDashboard },
        { name: "Sandbox", href: "/sandbox", icon: Box },
        { name: "API Keys", href: "/api-keys", icon: Database },
        { name: "Billing & Plans", href: "/billing", icon: CreditCard },
        { name: "API Reference", href: "/api-docs", icon: BookOpen },
        { name: "Settings", href: "/settings", icon: Settings },
        { name: "System Design", href: "/design-system", icon: Palette },
    ];

    return (
        <>
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-cyber-card border border-cyber-border rounded-lg text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-cyber-card/95 backdrop-blur-xl border-r border-cyber-border
        transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-cyber-border bg-gradient-to-r from-trust-100/5 to-transparent">
                        <ShieldCheck className="w-8 h-8 text-trust-100 mr-3" />
                        <span className="text-xl font-bold tracking-tight text-white">
                            Trust<span className="text-trust-100">Layer</span>
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? "text-trust-100 bg-trust-100/10 border border-trust-100/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-trust-100/10 to-transparent opacity-50" />
                                    )}
                                    <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`} />
                                    <span className="font-medium relative">{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User / Footer */}
                    <div className="p-4 border-t border-cyber-border bg-black/20">
                        <div className="text-xs text-zinc-500 text-center">
                            v1.0.0 Alpha
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
        </>
    );
}
