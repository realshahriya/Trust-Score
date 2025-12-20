import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

interface RiskCardProps {
    type: "success" | "warning" | "danger" | "info";
    title: string;
    description: string;
}

export function RiskCard({ type, title, description }: RiskCardProps) {
    const styles = {
        success: { border: "border-trust-100/30", bg: "bg-trust-100/5", icon: CheckCircle, color: "text-trust-100" },
        warning: { border: "border-yellow-500/30", bg: "bg-yellow-500/5", icon: AlertTriangle, color: "text-yellow-500" },
        danger: { border: "border-red-500/30", bg: "bg-red-500/5", icon: XCircle, color: "text-red-500" },
        info: { border: "border-blue-500/30", bg: "bg-blue-500/5", icon: Info, color: "text-blue-500" },
    };

    const config = styles[type];
    const Icon = config.icon;

    return (
        <div className={`p-4 rounded-lg border ${config.border} ${config.bg} backdrop-blur-sm flex items-start gap-4 transition-all hover:bg-opacity-10`}>
            <div className={`mt-0.5 p-1 rounded-full ${config.bg} bg-opacity-20`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
                <h4 className={`text-sm font-semibold ${config.color} uppercase tracking-wide`}>
                    {title}
                </h4>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
