# Universal Trust Score Layer – Algorithm Plan

**Objective:** Build a universal, AI-assisted trust scoring system for wallets, tokens, NFTs, contracts, and projects.

---

## Step 1: Entity Definition

- Input: JSON with `entity_type` and `identifier`.
- Supported entities: `wallet`, `token`, `nft`, `contract`, `project`.

Example:

```json
{
  "entity_type": "wallet",
  "identifier": "0xABC..."
}
```

---

### Step 2: Data Ingestion Layer

**Sources:**

1. **On-chain via viem**

   - Transaction history
   - Approval patterns
   - Contract bytecode & ABI
   - Deployer wallet history
   - Interaction graph

2. **Market data (CoinMarketCap, CoinGecko)**

   - Liquidity depth
   - Volume spikes
   - Price anomalies
   - Token/project age

3. **Off-chain social signals**

   - Twitter/X sentiment
   - Discord/Telegram community activity
   - GitHub repository activity
   - Website age and changes

---

### Step 3: Signal Normalization

- Convert all raw signals to a `0.0 → 1.0` scale where 1 = high risk.
- Examples:
  - Unlimited approvals → 0.9
  - Contract age > 1 year → 0.1
  - Sudden volume spike → 0.7

---

### Step 4: LLM Reasoning Layer (ChainGPT)

- Input: structured JSON with normalized signals.
- Task: pattern recognition, risk flag identification, explanation generation.
- Output schema:

```json
{
  "risk_patterns": ["honeypot-like", "wash-trading"],
  "confidence": 0.82,
  "explanation": "High approval drain risk combined with artificial volume."
}
```

---

### Step 5: Trust Score Engine

- Deterministic scoring formula using weighted signals.
- Example formula:

```json
Trust Score = 100 - (
  onchain_risk * 0.45 +
  market_risk * 0.30 +
  social_risk * 0.15 +
  ai_pattern_confidence * 0.10
)
```

- Output JSON:

```json
{
  "trust_score": 28,
  "risk_level": "High",
  "last_updated": "timestamp"
}
```

---

### Step 6: Continuous Updates

- Triggers:
  - New transaction or approval
  - Price anomaly
  - Social media spikes
  - Contract upgrades
- Incremental recalculation of scores.

---

### Step 7: API Layer

- Provide JSON response for embedding in dapps, wallets, marketplaces, exchanges.
- Example:

```json
{
  "entity": "0xABC...",
  "type": "wallet",
  "trust_score": 74,
  "risk_flags": ["frequent approvals"],
  "summary": "Generally safe but interacts with medium-risk contracts."
}
```

---

### Step 8: Modular & Scalable Design

- Each data source and signal extractor is a module.
- LLM reasoning is a separate service.
- Score engine is deterministic and auditable.
- New signals can be added without changing core logic.

---

### Step 9: Safety & Governance

- LLM only analyzes and explains, never executes transactions.
- Backend validation ensures API actions are safe.
- All AI outputs are explainable and traceable.
