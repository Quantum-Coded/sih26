# 🎤 APIx Presentation Speech (SIH 2026)
**Team**: Pearson Spector | **Problem Statement**: SIH26056  
**Presenters**: Avani (Leader), Dev, Tattva  
**Format**: Bullet-point cue cards for a high-impact, convincing pitch  

---

## 📌 Slide 1: Introduction & The Core Problem
**Speaker**: **Avani**

* **The Opening Hook**:
  * Good morning, respected judges. We are **Team Pearson Spector**, and today we present **APIx — India’s Real-Time Airfare Price Index**.
  * Presenting with me today are my teammates **Dev** and **Tattva**.

* **The Real Problem in Simple Terms**:
  * When the Reserve Bank of India (RBI) sets interest rates, it looks at retail inflation using the Consumer Price Index (CPI) published by the Ministry of Statistics (MoSPI).
  * But here is the shocking reality: for flight tickets, the government **still collects prices manually by visiting physical travel agent shops and airline counters once a month**.
  * Meanwhile, **90% of Indians book flights online**, where dynamic pricing algorithms change fares by **200% to 400% within a single day**.
  * The current inflation index is practically blind to the prices real travellers actually pay.

* **Our Solution**:
  * **APIx solves this completely**: We automatically track, clean, and analyze live online airfares across India, calculating a true daily price index that reflects real-world market reality.

---

## 📌 Slide 2: What We Have Built (The Live Platform Demo)
**Speaker**: **Dev**

* **The Core Philosophy**:
  * We built an institutional intelligence platform — think of it as a **Bloomberg Terminal for India's aviation and inflation economy**.
  * Let me walk you through what our screens actually do and why:

* **1. National Pulse (The Command Center)**:
  * Shows India's live Airfare Price Index at **117.4** (+3.8% today) against our 2024 baseline.
  * Features our custom interactive **Geospatial India Surveillance Map** showing 25 high-density flight corridors and live pulsing surge hotspots over hubs like Mumbai and Delhi.

* **2. Route Intelligence & Tax Unbundling**:
  * Lets an analyst deep-dive into any specific route like **Delhi to Mumbai**.
  * **Critical Innovation — Unbundling**: Traditional scrapers make the mistake of treating the total ticket price as airline fare.
  * Our engine automatically strips out statutory taxes (GST), airport development fees (UDF), and convenience charges so we measure **pure base airfare** without distorting inflation data.
  * Also models **Lead-Time Elasticity** across 5 advance-purchase windows: **T+1, T+7, T+15, T+30, and T+45 days**.

* **3. Surge Anomaly Monitor & Surge Fingerprint**:
  * Flags routes where prices cross a **2.0 sigma statistical outlier threshold**.
  * Features our signature visual — the **Surge Fingerprint** — which breaks down *why* prices spiked (e.g., 31% price momentum, 24% search demand, 18% weather alert, 15% airport operational delay).
  * Shows a **Propagation Network** demonstrating how a runway hold at Mumbai cascades price spikes into Bengaluru, Kochi, and Hyderabad.

* **4. Event Intelligence & Operational Lag**:
  * Connects price hikes to real-world multi-modal events: airport NOTAMs, IMD Doppler weather radars, passenger demand, and news spikes.
  * Shows our dual-axis chart proving that **when a major operational disruption hits an airport, airline pricing algorithms take an average of 3.8 hours to escalate fare tiers**.

* **5. Fare Forecast & What-If Scenario Simulator**:
  * Uses Bayesian time-series models to predict prices 7 days ahead with clear confidence intervals and transparent SHAP feature attributions.
  * Includes an **Interactive What-If Simulator** where policymakers can drag delay rates and storm warnings to see live recalculations of expected surge probabilities.

* **6. Audit Trail ("Trace This Number")**:
  * Zero black boxes: An auditor can click any published index value (like 117.4) and trace it through a visual provenance tree all the way down to the exact flight quote, timestamp, and cryptographic SHA-256 hash.

---

## 📌 Slide 3: How We Actually Do It (The Engineering & Data Engine)
**Speaker**: **Dev**

* **Data Harvesting Engine**:
  * We run automated extraction pipelines using **Python, Playwright, and Selenium** to capture live fare matrices across major Indian airlines (IndiGo, Air India, Akasa, SpiceJet) and leading OTAs.
  * We augment web extraction with verified data aggregation feeds from Google Flights, Skyscanner, and Amadeus developer APIs for cross-verification.

* **The Caching Layer (Why Our Demo is Lightning Fast)**:
  * Because external APIs have strict free-tier rate limits, **we have cached our multi-source responses into a fast Redis memory store and TimescaleDB**.
  * This allows our platform to query verified historical snapshots and live simulated feeds instantly without latency or rate-limit blocks.

* **Ethical & Compliant Data Policy**:
  * Our scrapers respect `robots.txt`, enforce per-domain rate limits (max 1 request per 5 seconds), and utilize exponential backoffs.
  * We query only publicly visible search results without bypassing paywalls or authentication.

* **Future Production Roadmap**:
  * Moving from prototype to national production, we plan to operate on enterprise paid API tiers.
  * With government backing (MoSPI/DGCA), we plan to sign formal **MoUs and data-sharing agreements** with airlines and aggregators to ingest direct NDC (New Distribution Capability) feeds, making web scraping purely a secondary validation layer.

---

## 📌 Slide 4: Feasibility, Viability & Costs
**Speaker**: **Tattva**

* **Operational & Infrastructure Costs**:
  * **Scraping & Proxy Infrastructure**: Running distributed headless browser nodes with rotating residential proxies (~$50–$150/month).
  * **Database & Caching**: PostgreSQL with TimescaleDB for time-series quote storage and Redis for sub-millisecond query responses (~$40–$100/month on cloud infrastructure).
  * **API & Compute**: LLM token costs for Grok/RAG and Sarvam voice queries (~$30–$80/month based on government analytical volume).
  * Total recurring operational cost is exceptionally lean compared to the crores of rupees currently spent on manual nationwide price collection field surveys.

* **Who Are We Selling / Providing This To?**:
  1. **Primary Institutional User**: **MoSPI & NSO** for official monthly CPI transportation sub-group inflation augmentation.
  2. **Monetary Authority**: **Reserve Bank of India (RBI)** for forward-looking inflation forecasting and interest rate policy inputs.
  3. **Aviation Regulator**: **DGCA & Ministry of Civil Aviation** for monitoring dynamic fare caps and passenger protection during seasonal demand shocks.
  4. **Commercial & Research Tier**: University economics researchers, financial institutions, and corporate enterprise travel desks.

---

## 📌 Slide 5: Impact, Benefits & Next-Gen AI
**Speaker**: **Tattva**

* **AI Copilot (RAG-Based Reasoning)**:
  * Non-technical government officers don't need to write SQL queries or understand statistical sigma levels.
  * Our **RAG-based AI Copilot (powered by Grok reasoning)** allows users to simply ask natural questions like *"Why is Mumbai surging today?"* or *"Compare holiday pressure this year vs last year"*, and the AI navigates the dashboard and generates structured investigative dossiers.

* **Sarvam AI Native Multilingual Voice**:
  * Language must never be a barrier in India.
  * We integrated **Sarvam AI’s native Indian-language speech engine** supporting voice interactions in **Hindi, Marathi, Tamil, Bengali, and English**.
  * A regional officer can simply speak: *"दिल्ली से मुंबई का एयरफेयर आज क्यों बढ़ रहा है?"* — the system transcribes it, runs the analysis, and provides spoken/visual answers in real time.

* **OpenAPI 3.0 Standard for Developers**:
  * We provide standardized REST endpoints with full Swagger/OpenAPI specifications, enabling any government agency or external data pipeline to ingest our cleaned airfare index with zero friction.

* **Reusable Blueprint for India's Digital CPI**:
  * The architecture we built for flights is a **universal blueprint**.
  * The exact same pipeline can be extended tomorrow to track online hotel tariffs, ride-hailing cabs (Ola/Uber), and digital grocery deliveries for an entirely modernized National Consumer Price Index.

---

## 📌 Slide 6: Conclusion & Wrap-Up
**Speaker**: **Avani**

* **Closing Summary**:
  * Respected judges, APIx transforms airfare price collection from an outdated, once-a-month manual counter inquiry into a **real-time, high-frequency, verifiable, and predictive national economic asset**.
  * It answers the four essential economic questions: **What happened, Where did it surge, Why did it move, and What is coming next?**
  * We have built the system, validated the methodology against 12 months of DGCA benchmarks, and created an accessible, multilingual tool ready for institutional deployment.
  * Thank you very much, and Team Pearson Spector is now eager to take your questions!
