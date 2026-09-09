# APIx — Real-Time Airfare Price Index for India
### Augmentation of the Consumer Price Index (CPI) | MoSPI & RBI Policy Intelligence

> *"Measure airfare movement. Detect surges. Understand why. Predict what comes next."*

APIx is an end-to-end, high-frequency airfare intelligence and price index platform engineered for the **National Statistical Office (NSO), Ministry of Statistics and Programme Implementation (MoSPI)**, and the **Reserve Bank of India (RBI)** under the flexible inflation-targeting framework.

---

## 📌 Problem Context
Under India's current CPI framework, 'Transport and Communication' airfare sub-group prices are primarily collected through manual inquiry from physical ticketing counters. With over 90% of domestic air tickets now sold online via airline portals (IndiGo, Air India, Akasa Air, SpiceJet) and OTAs (MakeMyTrip, EaseMyTrip, Ixigo), manual sampling fails to capture dynamic pricing that fluctuates by 200%–400% within a single day.

APIx replaces static sampling with an automated, ethically governed, high-frequency surveillance observatory that mirrors what real Indian consumers actually pay.

---

## 🏛️ Platform Architecture: 10 Analytical Workspaces

| # | Workspace | Purpose & Capabilities |
|---|---|---|
| **1** | **National Pulse** | Executive command center with top 5 macro KPIs, custom interactive India Sector Surveillance SVG map, 30D APIx movement chart, top surge/decline tables, and high-frequency external market signals. |
| **2** | **Route Intelligence** | Sector deep-dive across 25 DGCA city-pairs, 365-day trajectory with 95% CI anomaly band, booking window lead-time curve (T+45 to T+1), carrier quote breakdown, statutory tax/fee unbundling, and price position spectrum ruler. |
| **3** | **Surge Anomaly Monitor** | Algorithmic early-warning system (Z-score > 2.0σ), **Surge Fingerprint** proportional attribution (momentum, search demand, weather, ATC ops, holidays), hourly anomaly onset tracker, and hub contagion propagation graph. |
| **4** | **Event Intelligence** | Multi-modal signal correlation, dual-axis Event Intensity vs. Airfare Response overlay chart quantifying operational transmission lag (~3.8h), and cryptographic evidence stack (AAI NOTAMs, IMD Doppler radar). |
| **5** | **Fare Forecast** | 7-day Bayesian Structural Time Series forecast, explainable prediction (SHAP feature attribution), and an **Interactive What-If Scenario Simulator** with dynamic recalculation of predicted fare and surge probability. |
| **6** | **Policy & Econometric Analytics** | **National Index Delta Waterfall** decomposition chart, macro-regional sub-indices (North, West, South, East, Central, Northeast), market segment elasticity, festive period multipliers, and historical condition analogue pattern matcher. |
| **7** | **Audit & Data Trust** | 8-stage data ingestion and sanitization pipeline stepper with pass-rate metrics, **Trace This Number** interactive provenance tree (Index 117.4 &rarr; route contributions &rarr; carrier quotes), and cryptographic quote ledger with SHA-256 signatures. |
| **8** | **Validation / Backtest** | Empirical methodology verification against 12 months of official ex-post DGCA monthly passenger yield reports (**R = 0.942, MAPE = 3.2%, Directional Accuracy = 89.4%**). |
| **9** | **Ask APIx** | Agentic AI investigation workspace (structured dossier with audited cross-domain signal checklists, not a generic chat bubble). |
| **10** | **Government API Explorer** | 3-panel REST playground with OpenAPI 3.0 standardized endpoints, query parameters, syntax-highlighted JSON viewer, and downloadable Swagger schemas. |

---

## 🎙️ Key Innovations
* **Statutory Tax & Fee Unbundling**: Isolates pure dynamic base airfare from pass-through GST statutory taxes, AERA User Development Fees (UDF), and convenience charges to guarantee retail inflation integrity.
* **Sarvam AI Multilingual Voice Search**: Native Indian-language automatic speech recognition (ASR) supporting Hindi (हिन्दी), Marathi (मराठी), Tamil (தமிழ்), Bengali (বাংলা), and English with automatic dashboard navigation.
* **Persistent AI Copilot Drawer**: Contextual reasoning assistant available across every workspace for instant cross-dashboard investigation.
* **Cryptographic Provenance**: Mathematical audit trail ensuring zero black-box metrics.

---

## 🛠️ Technology Stack
* **Framework**: React 19 + TypeScript
* **Build Tooling**: Vite v8
* **Styling**: Tailwind CSS v3 + Semantic Design Tokens
* **Charting**: Recharts + Custom Geospatial SVG Vector Engine
* **Icons**: Lucide React
* **Routing**: React Router DOM v6
* **Voice & AI**: Sarvam AI Multilingual ASR + Grok reasoning integration

---

## 🚀 Getting Started

### Prerequisites
* Node.js v20+ or v22+
* npm v10+

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/Quantum-Coded/sih26.git
cd sih26

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The application will be running at `http://localhost:5173/`.

### Production Build
```bash
npm run build
```

---

## 📄 License
MIT License. Copyright (c) 2026 Quantum-Coded.
