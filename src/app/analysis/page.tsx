import { Suspense } from 'react';
import AnalysisView from '@/components/AnalysisView';
import { Navbar } from '@/components/Navbar';

export default function AnalysisPage() {
    return (
        <div className="min-h-screen bg-cyber-bg text-white">
            <Navbar />
            <main className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
                <Suspense fallback={<div className="text-center pt-20">Loading Analysis...</div>}>
                    <AnalysisView />
                </Suspense>
            </main>
        </div>
    );
}
