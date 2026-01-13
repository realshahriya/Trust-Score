import { ShieldCheck, Activity, Globe, TrendingUp, Users, Zap, AlertTriangle, CheckCircle, ArrowRight, BarChart3, Shield } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";

export default function Home() {
  return (
    <div className="p-6 space-y-8 relative z-10 overflow-y-auto">
      {/* Hero Section - Brand Themed */}
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-sans">
          Universal Trust Score Layer
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Real-time blockchain intelligence and threat detection across multiple chains
        </p>
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon"></div>
          <div className="w-2 h-2 rounded-full bg-neon shadow-neon"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon"></div>
        </div>
      </div>

      {/* Platform Stats - Subtle Cyan Themed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 border border-neon/10 rounded-xl p-6 hover:border-neon/20 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-neon/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-neon" />
            </div>
            <span className="text-xs text-neon font-medium">+12% this week</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">2.4M+</div>
          <div className="text-sm text-zinc-500">Daily Scans</div>
        </div>

        <div className="bg-zinc-900/50 border border-neon/10 rounded-xl p-6 hover:border-neon/20 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-neon/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-neon" />
            </div>
            <span className="text-xs text-neon font-medium">+8% growth</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">48.2K</div>
          <div className="text-sm text-zinc-500">Active Users</div>
        </div>

        <div className="bg-zinc-900/50 border border-red-500/10 rounded-xl p-6 hover:border-red-500/20 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-xs text-red-400 font-medium">+23% detected</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">1,247</div>
          <div className="text-sm text-zinc-500">Threats Blocked Today</div>
        </div>

        <div className="bg-zinc-900/50 border border-green-500/10 rounded-xl p-6 hover:border-green-500/20 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-xs text-green-400 font-medium">Stable</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">99.99%</div>
          <div className="text-sm text-zinc-500">System Uptime</div>
        </div>
      </div>

      {/* Quick Analysis - Brand Themed */}
      <div className="bg-zinc-900/50 border border-neon/10 rounded-2xl p-8 hover:border-neon/20 transition-all">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-neon/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-neon/20">
              <Zap className="w-6 h-6 text-neon" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 font-sans">Quick Analysis</h2>
            <p className="text-zinc-400 text-sm">Test wallet or contract addresses across multiple chains instantly</p>
          </div>

          <div className="space-y-3">
            <SearchInput placeholder="Enter wallet address, contract, or ENS name to analyze..." />
          </div>
        </div>
      </div>

      {/* Quick Navigation - Cyan Themed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard"
          className="group bg-gradient-to-br from-brand-purple/5 to-brand-purple/10 border border-brand-purple/20 hover:border-brand-purple/30 rounded-2xl p-8 transition-all"
        >
          <BarChart3 className="w-12 h-12 text-brand-purple mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Dashboard</h3>
          <p className="text-sm text-zinc-400 mb-4">
            View your API usage, analytics, and recent activity
          </p>
          <div className="flex items-center gap-2 text-brand-purple font-medium text-sm">
            Go to Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/playground"
          className="group bg-gradient-to-br from-brand-pink/5 to-brand-pink/10 border border-brand-pink/20 hover:border-brand-pink/30 rounded-2xl p-8 transition-all"
        >
          <Zap className="w-12 h-12 text-brand-pink mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Playground</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Test wallet analysis, DEX swaps, and threat interception
          </p>
          <div className="flex items-center gap-2 text-brand-pink font-medium text-sm">
            Try Interactive Demos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/docs"
          className="group bg-gradient-to-br from-brand-orange/5 to-brand-orange/10 border border-brand-orange/20 hover:border-brand-orange/30 rounded-2xl p-8 transition-all"
        >
          <Globe className="w-12 h-12 text-brand-orange mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold text-white mb-2">Documentation</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Explore API reference, features, and integration guides
          </p>
          <div className="flex items-center gap-2 text-brand-orange font-medium text-sm">
            Read Documentation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* System Status - Cyan Themed */}
      <div className="bg-zinc-900/50 border border-neon/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-neon" />
            <h3 className="text-lg font-bold text-white">System Status</h3>
          </div>
          <span className="text-xs px-3 py-1 bg-neon/10 text-neon rounded-full border border-neon/20">
            ● All Systems Operational
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-black/20 rounded-xl p-4 border border-neon/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">API Gateway</span>
              <span className="text-xs text-neon">99.9%</span>
            </div>
            <div className="text-xs text-zinc-500 mb-2">Uptime</div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-neon/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Analysis Engine</span>
              <span className="text-xs text-neon">100%</span>
            </div>
            <div className="text-xs text-zinc-500 mb-2">Latency</div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-neon/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Threat Detection</span>
              <span className="text-xs text-neon">99.8%</span>
            </div>
            <div className="text-xs text-zinc-500 mb-2">Latency</div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon rounded-full" style={{ width: '99.8%' }}></div>
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-neon/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Database Cluster</span>
              <span className="text-xs text-neon">100%</span>
            </div>
            <div className="text-xs text-zinc-500 mb-2">Uptime</div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Global Threats - Themed */}
      <div className="bg-zinc-900/50 border border-neon/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-white">Recent Global Threats</h3>
          </div>
          <Link href="/playground" className="text-xs text-neon hover:text-neon-light transition-colors flex items-center gap-1">
            View All Threats
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {[
            { name: "Phishing", severity: "HIGH", address: "0xabcd...ef12", time: "2 minutes ago", count: 247 },
            { name: "Drainer Contract", severity: "CRITICAL", address: "0x1234...5678", time: "8 minutes ago", count: 89 },
            { name: "Fake Token", severity: "MEDIUM", address: "0xfedc...ba98", time: "15 minutes ago", count: 164 },
            { name: "Rug Pull", severity: "HIGH", address: "0x9876...5432", time: "1 hour ago", count: 432 },
          ].map((threat, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:border-neon/20 transition-all group">
              <div className="flex items-center gap-4">
                <AlertTriangle className={`w-5 h-5 ${threat.severity === 'CRITICAL' ? 'text-red-500' :
                  threat.severity === 'HIGH' ? 'text-orange-400' : 'text-yellow-400'
                  }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{threat.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${threat.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      threat.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                      {threat.severity}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono mt-1">{threat.address} · {threat.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{threat.count}</div>
                <div className="text-xs text-zinc-500">attempts blocked</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Highlights - Cyan Themed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-neon/5 to-transparent border border-neon/10 rounded-2xl p-6 text-center">
          <TrendingUp className="w-12 h-12 text-neon mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">99.7%</div>
          <div className="text-sm text-zinc-400">Accuracy</div>
          <p className="text-xs text-zinc-600 mt-2">Our AI-powered trust scoring achieves industry-leading accuracy in threat detection</p>
        </div>

        <div className="bg-gradient-to-br from-neon/5 to-transparent border border-neon/10 rounded-2xl p-6 text-center">
          <Zap className="w-12 h-12 text-neon mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">&lt;50ms</div>
          <div className="text-sm text-zinc-400">Response Time</div>
          <p className="text-xs text-zinc-600 mt-2">Lightning-fast API responses ensure seamless integration into your infrastructure</p>
        </div>

        <div className="bg-gradient-to-br from-neon/5 to-transparent border border-neon/10 rounded-2xl p-6 text-center">
          <Globe className="w-12 h-12 text-neon mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">15+ Chains</div>
          <div className="text-sm text-zinc-400">Multi-chain Support</div>
          <p className="text-xs text-zinc-600 mt-2">Comprehensive coverage across blockchains networks and L2 solutions</p>
        </div>
      </div>
    </div>
  );
}
