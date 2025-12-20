import Link from 'next/link';
import { ShieldCheck, Activity, Search, Menu } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-border bg-cyber-bg/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-trust-50/20 ring-1 ring-trust-100/50">
                            <ShieldCheck className="w-6 h-6 text-trust-100" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Trust<span className="text-trust-100">Layer</span>
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-trust-100 transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/analysis" className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-trust-100 transition-colors">
                                Analysis
                            </Link>
                            <Link href="/api-docs" className="px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-trust-100 transition-colors">
                                API
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button className="p-2 text-zinc-400 hover:text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
