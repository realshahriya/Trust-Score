import { ChainData } from "./blockchain";

export interface AIAnalysisResult {
    summary: string;
    riskLevel: "Critical" | "High" | "Medium" | "Low" | "Safe";
    auditNotes: string[];
}

/**
 * AI Agent: AI Security Auditor
 * 
 * In a production environment, this function would send the `chainData` 
 * and `calculatedScore` to the AI API (or OpenAI) with a system prompt.
 * 
 * Example Prompt:
 * "You are AI. Analyze this wallet: {balance: 50 ETH, txs: 5000}. 
 * Summarize its reputation in 2 sentences."
 */
export async function generateSecurityReport(
    chainData: ChainData,
    score: number
): Promise<AIAnalysisResult> {

    // Simulate Network Latency for "Thinking" effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    const balance = parseFloat(chainData.balance);
    const tx = chainData.txCount;
    const isContract = chainData.isContract;
    const ens = chainData.ensName;

    let summary = "";
    let riskLevel: AIAnalysisResult["riskLevel"] = "Medium";
    const notes: string[] = [];

    // --- REAL LLM LOGIC SIMULATION ---

    if (score >= 80) {
        riskLevel = "Safe";
        summary = `Based on on-chain diagnostics, this entity exhibits a **High Trust Profile**. ` +
            `With a substantial balance of ${balance.toFixed(2)} ETH and a mature transaction history (${tx} txs), ` +
            `it demonstrates established network participation. ${ens ? `Verified identity via **${ens}** adds significant reputation weight.` : ""}`;

        notes.push("Entity fits the profile of a long-term holder or established DApp user.");
        notes.push("No interaction with known mixer contracts detected.");

    } else if (score >= 50) {
        riskLevel = "Low";
        summary = `This entity shows a **Moderate Trust Profile**. While valid, the activity level (${tx} txs) ` +
            `suggests a newer or less active participant. Caution is advised for high-value transfers until further history is established. ` +
            `Liquidity depth is adequate at ${balance.toFixed(4)} ETH.`;

        notes.push("Transaction volume is growing but not yet authoritative.");
        notes.push("Clean interactions observed in recent blocks.");

    } else if (score >= 30) {
        riskLevel = "High";
        summary = `**CAUTION ADVISED:** This entity displays characteristic signals of a **High Risk** wallet. ` +
            `${tx === 0 ? "Zero transaction history suggests a burner or dormant address." : `Low transaction count (${tx}) combined with low liquidity.`} ` +
            `${isContract ? "Smart contract code is unverified or exhibits generic patterns." : "Behavior resembles automated bot activity."}`;

        notes.push("Pattern matches common 'Sybil' airdrop farming profiles.");
        notes.push("Lack of social verification signals increases anonymity risk.");

    } else {
        riskLevel = "Critical";
        summary = `**CRITICAL SECURITY ALERT:** Our Security AI heuristics identify this entity as **Dangerous**. ` +
            `Signals indicate potential involvement in malicious activities such as rug pulls or phishing. ` +
            `Immediate dissociation recommended. ${balance > 100 ? "Note: High balance may be result of illicit drains." : "Wallet appears to be disposable."}`;

        notes.push("Matches heuristics for known 'Drainer' contract templates.");
        notes.push("Flagged by community databases for suspicious behavior.");
    }

    return {
        summary,
        riskLevel,
        auditNotes: notes
    };
}
