# CENCERA: Project Concept & Architecture

## The Vision

**CENCERA** allows users to visualize and compute trust in the "Dark Forest" of Web3. It is not just a scanner; it is a **predictive defense layer**.

## Trust Scoring Algorithm

The core of Cencera is a specific, step-by-step algorithmic requirement that combines AI analysis with hard data points.

### Workflow Logic

```mermaid
graph TD
    Input[Input Address] --> StorageCheck{Check AI Storage}
    
    StorageCheck -->|Found| ShowCached[Show Cached Data]
    ShowCached --> ReEvaluate[Background Re-Evaluation]
    
    StorageCheck -->|Not Found| SearchExt[Search BlockExplorers / CMC / CG]
    
    ReEvaluate --> SearchExt
    
    SearchExt -->|Listed| GetMeta[Extract Value: <br/>1. Category (DeFi/NFT/Wallet/Token)<br/>2. Official Website<br/>3. X/Twitter Handle]
    
    GetMeta --> SocialCheck[Check Social Status]
    SocialCheck --> OnChainCheck[Check On-Chain History]
    
    SearchExt -->|Not Listed| CodeAudit[AI Audits Contract Code Directly]
    CodeAudit --> OnChainCheck
    
    OnChainCheck --> AIAnalysis[AI Final Analysis & Scoring]
    
    AIAnalysis --> SaveDB[Save/Update to AI Storage & Blacklist Check]
    SaveDB --> Output[Output Updated Results]
```

## Detailed Execution Steps

### 1. Storage Check & Re-Evaluation (The Loop)

* **Step 1:** The system checks `ai-agent/data/docs` for existing records.
  * *Check `scamAddresses.json`*: Is this a known blacklist address?
  * *Check `knowledge_base`*: Do we have a prior score?
* **Step 2 (The Refinement):** If data is found, we show it instantly to the user **BUT** we trigger a background re-evaluation.
  * *Reason:* A safe contract yesterday might be compromised today (e.g., owner key leak).
  * *Action:* The AI compares new on-chain data with the stored snapshot. If metrics have degraded (e.g., liquidity pulled), the score is downgraded and the database updated.

### 2. External Data Aggregation (OSINT)

The AI performs an autonomous web search to verify the entity's digital footprint:

* **CoinMarketCap / CoinGecko**: Checks for verified listing status.
* **Block Explorers (Etherscan/BscScan)**:
  * Verifies "Contract Name" matches marketing.
  * Checks "Creator Address" for funding sources (e.g., did the deployer come from Tornado Cash?).
* **Social Media (X/Twitter)**: verify if the handle provided on-chain matches the official account.

### 3. AI Code Audit & Analysis

If the contract is unverified or "Unknown", the AI acts as a smart contract auditor:

* **Pattern Matching**: Checks bytecode against `bytecodePatterns.json` for known vulnerabilities (Reentrancy, Unchecked External Calls).
* **Signature Detection**: Scans against `attackSignatures.json` to see if the contract logic resembles known hacks.
* **Function Analysis**: Identifies dangerous functions like `selfdestruct`, `delegatecall`, or hidden `mint` functions.

## Data Infrastructure

The AI operates with a structured, self-correcting data layer:

#### A. AI Storage (`ai-agent/data/`)

* **`chains/info.json`**: Network-specific metadata and endpoints.
* **`docs/scamAddresses.json`**: A global, cross-chain blacklist of biased or fraudulent addresses.
  * *Capabilities:* The AI can append new addresses here automatically if a scan reveals a "Certain Scam" (Score < 10).
* **`docs/attackSignatures.json`**: A growing library of exploit signatures.
* **`docs/bytecodePatterns.json`**: Fingerprints of malicious smart contract code.

#### B. Recursive Learning

1. **Input**: User scans Address A.
2. **Analysis**: AI computes Score 85.
3. **Storage**: Data is saved.
4. **Reuse**: Next user scans Address A -> gets 85 instantly -> AI re-checks in background -> finds new "Renounce Ownership" tx -> Updates score to 90.

## AI Capabilities Breakdown

1. **Autonomous Web Search**:
    * *Action*: "Search CoinMarketCap or CoinGecko for '[Contract Address]' and '[Project Name]'".
    * *Goal*: Valid links, recent news, community warnings.

2. **Self-Correcting Storage**:
    * *Action*: Read JSON -> Update Field -> Write JSON.
    * *Goal*: Ensure `lastUpdated` timestamps are current and scores reflect reality.

3. **Blacklist Management**:
    * *Action*: `checkBlacklist(address)` -> returns boolean.
    * *Goal*: Instant protection from known threats.

4. **Deep Chain Research**:
    * *Action*: Parse raw hex data from transactions to understand *what* the contract is actually doing, not just what it says it does.

5. **Report Validation**:
    * *Action*: User reports "Scam". AI investigates check-chain flow. If verified, address is added to `scamAddresses.json`.

## Technical Stack

* **Frontend**: Next.js 14 (App Router), TailwindCSS, Framer Motion.
* **Backend**: Node.js API Routes (Serverless).
* **AI Engine**: Large Language Model (LLM) with function calling for:
  * `search_web(query)`
  * `read_blockchain(address)`
  * `update_database(key, value)`
