import { Navbar } from "@/components/Navbar";
import { SearchInput } from "@/components/SearchInput";
import { ShieldCheck, Activity, Users, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-bg flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-trust-100/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 pt-20">
        <div className="w-full max-w-4xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-trust-100/30 bg-trust-100/5 text-trust-100 text-sm font-medium tracking-wide animate-pulse-slow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trust-100 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-trust-100"></span>
            </span>
            Live Trust Mainnet Alpha
          </div>

          {/* Hero */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-trust-100 to-blue-500">Trust Score</span> Layer
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            The AI-powered reputation engine for the decentralized web.
            Analyze wallets, contracts, and NFTs in real-time.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto w-full pt-8">
            <SearchInput className="shadow-2xl shadow-trust-100/10" />
            <div className="flex justify-center gap-4 mt-4 text-sm text-zinc-500">
              <span>Try: <button className="text-trust-100 hover:underline">vitalik.eth</button></span>
              <span>or <button className="text-trust-100 hover:underline">0xBadContract</button></span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20 text-left">
            <Feature
              icon={Activity}
              title="Real-time Scoring"
              desc="Continuous monitoring of on-chain behavior and risk patterns."
            />
            <Feature
              icon={Users}
              title="Social Sentiment"
              desc="AI analysis of community discussions and reputation signals."
            />
            <Feature
              icon={Lock}
              title="Fraud Detection"
              desc="Instant alerts for rug pulls, wash trading, and plagiarism."
            />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-zinc-600 text-sm">
        <p>© 2025 Universal Trust Layer. Powered by AI.</p>
      </footer>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-trust-100/30 transition-colors backdrop-blur-sm">
      <Icon className="w-8 h-8 text-trust-100 mb-4" />
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-400">{desc}</p>
    </div>
  );
}
