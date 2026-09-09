Build a polished, production-quality frontend web application called:

APIx — India Airfare Intelligence

Tagline:
"Measure airfare movement. Detect surges. Understand why. Predict what comes next."

This is a sophisticated India-focused airfare intelligence and analytics platform for government analysts, policymakers, researchers, travel industry professionals, and informed travellers.

The product is NOT a normal flight-booking website and NOT a generic travel aggregator.

The core product story is:

WHAT happened?
→ Airfare Price Index and route-level movement

WHERE?
→ Route and geographic surge detection

WHY?
→ Events, weather, demand, holidays and operational signals

WHAT NEXT?
→ ML-powered fare pressure / forecast

CAN WE TRUST IT?
→ Full traceability and audit trail

CAN GOVERNMENT USE IT?
→ Government API / data access interface

CAN PEOPLE ASK IT NATURALLY?
→ Agentic AI assistant with voice and Indian-language interaction

--------------------------------------------------
1. DESIGN DIRECTION
--------------------------------------------------

Follow the UI UX Pro Max design philosophy for BI / analytics products.

Use this combination of styles:

PRIMARY:
- Data-Dense Dashboard
- Executive Dashboard
- Real-Time Monitoring
- Drill-Down Analytics

SECONDARY:
- Predictive Analytics
- Heat Map / Geographic Analytics
- Trust & Authority
- Minimalism / Swiss-style information design

The result should feel like:
- Bloomberg terminal meets modern enterprise SaaS
- government-grade data observatory
- premium analytics platform
- modern but restrained
- highly information-dense without becoming cluttered

Do NOT make it look like:
- a consumer airline booking site
- a generic SaaS template
- a crypto dashboard
- neon cyberpunk
- excessive glassmorphism
- excessive gradients
- overly rounded cartoon UI
- generic AI chatbot UI
- excessive bento boxes
- excessive animations

Visual character:
- precise
- analytical
- trustworthy
- premium
- calm
- information-rich
- India-focused without using cliché "Indian" visual motifs

--------------------------------------------------
2. VISUAL SYSTEM
--------------------------------------------------

Use a mostly light interface with a highly polished off-white / white analytical canvas.

Background:
- very light warm-neutral / cool-neutral background
- main cards white
- subtle separation between surfaces

Primary brand color:
- deep institutional blue / India-inspired blue
- use it for navigation, primary CTAs, selected states and key analytical elements

Supporting colors:
- green = positive / falling fares / healthy status
- amber = elevated / warning
- red = surge / anomaly / critical
- purple/indigo = AI / predictive layer
- muted slate = secondary information

Do not overuse colors.
Color should communicate meaning, not decoration.

Use semantic tokens rather than random colors throughout the UI.

Typography:
- clean modern sans-serif
- strong numeric typography
- clear hierarchy
- large KPI values
- compact but highly readable tables
- use tabular/monospaced number treatment where useful

Suggested typography hierarchy:
- page title: 28–36px
- section title: 18–22px
- KPI number: 28–42px
- body: 14–16px
- dense metadata: 12–13px

Ensure WCAG-friendly contrast.

No text smaller than 12px for meaningful UI.

--------------------------------------------------
3. LAYOUT SYSTEM
--------------------------------------------------

Desktop-first analytical workspace with excellent tablet/mobile adaptation.

Use:
- fixed/sticky left navigation
- top contextual header
- 12-column analytical grid
- consistent 8px spacing system
- compact cards
- sticky table headers
- sticky filters where useful
- drill-down interactions
- URL/deep-linkable routes

Sidebar:
- APIx logo
- National Pulse
- Route Intelligence
- Surge Monitor
- Event Intelligence
- Fare Forecast
- Policy Analytics
- Audit & Data Trust
- Ask APIx
- Settings / methodology

At the bottom of sidebar:
- LIVE DATA indicator
- last refresh timestamp
- data quality score

Main content area:
- max-width around 1440px
- generous analytical whitespace
- dense information only where useful
- avoid huge empty hero sections inside the application

--------------------------------------------------
4. GLOBAL APPLICATION HEADER
--------------------------------------------------

Top bar should contain:

Left:
- page title
- breadcrumb
- optional context label

Center/right:
- Global date selector
- "Live" indicator
- refresh timestamp
- data quality badge
- methodology version
- AI assistant button
- language/voice button
- notification icon
- profile / demo user

Add a small persistent status:

"Market data • Updated 14:08 IST"

When using demo data:
show:
"DEMO DATA • Historical simulation"
instead of pretending it is live.

This distinction must be visually clear.

--------------------------------------------------
5. PAGE 1 — NATIONAL PULSE
--------------------------------------------------

Purpose:
The executive command center and first screen shown to judges.

Title:
"India Airfare Pulse"

Subtitle:
"Real-time view of airfare movement across representative Indian routes."

TOP KPI ROW:

1. India Airfare Price Index
   Example:
   117.4
   +3.8% today

2. National Fare Pressure
   68 / 100
   "Elevated"

3. Routes Under Surge
   14
   +4 today

4. Live Fare Observations
   1,284
   Updated recently

5. Data Quality
   96.8%
   "Healthy"

Below KPI row:

SECTION — INDIA MARKET MAP

Large India map with:
- airport nodes
- important route lines
- route pressure visualization
- animated but subtle pulse for active surges
- hover tooltips
- city/airport labels
- severity colors

Clicking a route opens Route Intelligence.

Map legend:
- Normal
- Elevated
- High
- Extreme

SECTION — MARKET MOVEMENT

Large chart:
"India APIx — 30 Day Movement"

Controls:
- 7D
- 30D
- 90D
- YTD

Overlay:
- APIx
- baseline
- anomaly regions

SECTION — TOP SURGES

Table:
Rank
Route
Current Fare
Baseline
Surge %
Pressure
Trend
Confidence

Example:
1  DEL → BOM   ₹7,480   ₹5,825   +28.4%   High
2  BOM → BLR   ₹6,920   ₹5,710   +21.2%   High

SECTION — TOP DECLINES

Same structure.

SECTION — WHY IS THE MARKET MOVING?

An analytical summary card:
"Today's national movement is primarily concentrated in Western India and major metro routes."

Show:
- route contribution
- event contribution
- demand contribution
- operational contribution

Include:
[Investigate with AI]

SECTION — LIVE MARKET SIGNALS

Horizontal cards:
- Search demand ↑
- Weather risk
- Airport disruptions
- Holiday effect
- News activity

--------------------------------------------------
6. PAGE 2 — ROUTE INTELLIGENCE
--------------------------------------------------

Purpose:
Deep investigation of one route.

Header:
"Route Intelligence"

Controls:

Origin:
Delhi (DEL)

Destination:
Mumbai (BOM)

Departure:
16 Sep 2026

Lead time:
T+1
T+7
T+15
T+30
T+45

Preset:
Business
Leisure
Weekend

TOP ROUTE SUMMARY:

Current Median Fare
₹7,480

Comparable Baseline
₹5,825

Surge
+28.4%

Pressure Score
84 / 100

Anomaly
2.31σ

Below:

SECTION — FARE MOVEMENT

Large interactive chart.

Show:
- current fare
- comparable baseline
- predicted fare
- anomaly band
- event markers
- weather markers
- disruption markers

Tooltip should show:
timestamp
fare
source indicator
booking window

SECTION — BOOKING WINDOW

Horizontal lead-time visualization:

T+45   ₹4,900
T+30   ₹5,100
T+15   ₹5,700
T+7    ₹6,500
T+1    ₹9,200

Add:
"Lead-time elasticity: High"

SECTION — AIRLINE COMPARISON

Table:
Airline
Lowest fare
Median fare
Flights
Fare change
Availability

Use airline logos only when legally/technically appropriate; otherwise use clean text badges.

SECTION — FARE COMPOSITION

Stacked visualization:
Base fare
Taxes
Fees
Other charges

SECTION — PRICE POSITION

Show current fare compared with:
- historical normal range
- lowest observed
- median
- upper percentile

Visual:
LOW ───── NORMAL ───── HIGH ───── EXTREME

--------------------------------------------------
7. PAGE 3 — SURGE MONITOR
--------------------------------------------------

Purpose:
Identify unusual airfare spikes.

Title:
"Surge Monitor"

Subtitle:
"Detect abnormal airfare movement before it becomes obvious."

TOP:
Severity tabs:
All
Elevated
High
Extreme

Filters:
- route
- region
- airline
- lead time
- 1h / 6h / 24h / 7d
- minimum surge %

MAIN TABLE:

Route
Current
Baseline
Surge
Z-score
Onset
Pressure
Confidence
Possible Driver

Example:
DEL-BOM
₹7,480
₹5,825
+28.4%
2.31σ
13:40
84
87%
Demand / disruption

IMPORTANT VISUAL:
"Surge fingerprint"

For selected route show horizontal contributions:
Price momentum
Demand
Weather
Operations
Holiday
News

Use proportional bars.

SECTION:
"Surge Onset"

Show the exact point where the statistical anomaly emerged.

SECTION:
"Surge Propagation"

Visual network:
BOM airport
→ DEL
→ BLR
→ HYD
→ MAA

Show how an airport-level event can affect connected routes.

Add:
"Investigate this surge"

--------------------------------------------------
8. PAGE 4 — EVENT INTELLIGENCE
--------------------------------------------------

Purpose:
Explain possible external drivers of airfare movement.

Title:
"Event Intelligence"

Subtitle:
"Connect airfare movement with demand, weather, news and operational conditions."

Top filters:
Date
Location
Airport
Event type
Severity
Route

Main layout:
LEFT = event timeline
RIGHT = affected routes

EVENT TYPES:
Weather
Airport disruption
Major event
Holiday
Festival
Travel demand
News spike
Operational issue

Each event card:
- title
- location
- timestamp
- severity
- source type
- affected airports
- affected routes
- fare impact

SECTION — EVENT / FARE OVERLAY

Large timeline chart:
event intensity + airfare movement

Show:
event marker
fare spike
time lag

Example annotation:
"Event signal → fare acceleration: ~4 hours"

SECTION — EVENT IMPACT

Selected event:
"Major Mumbai airport disruption"

Show:
Affected routes
DEL-BOM +24%
BOM-BLR +18%
BOM-HYD +14%

Association score:
0.71

Lag:
3–6h

IMPORTANT DISCLAIMER:
"Temporal/statistical association detected. Causality is not established."

SECTION — EVIDENCE STACK

Cards:
News
Weather
Operations
Search demand
Holiday calendar

Each card has:
source
timestamp
short summary
"View evidence"

--------------------------------------------------
9. PAGE 5 — FARE FORECAST
--------------------------------------------------

Purpose:
Show the predictive ML layer.

Title:
"Fare Forecast"

Subtitle:
"Estimate future fare pressure using historical movement, demand and contextual signals."

Route selector:
DEL → BOM

Departure date:
16 Sep 2026

Forecast horizon:
24h
3D
7D

TOP:
Current fare
₹6,820

Predicted fare
₹7,350

Prediction range
₹7,200–₹7,700

Surge probability
78%

Confidence
Medium / High

MAIN CHART:
Actual vs predicted fare.

Show:
historical actual
current point
predicted future
confidence interval

SECTION — MODEL SIGNALS

Show:
Lead time
Recent fare momentum
Search demand
Weather
Flight disruptions
Holiday proximity
Event intensity

SECTION — EXPLAINABLE PREDICTION

Example:

Why is the model expecting upward pressure?

Lead time          +31%
Fare momentum      +24%
Search demand      +18%
Weather            +11%
Holiday             +9%
Operations          +5%
Other               +2%

Represent using polished horizontal contribution bars.

SECTION — SCENARIO SIMULATOR

Controls:
Search demand
Weather risk
Delay rate
Event severity

Example:

Delay rate:
10% → 25%

Then visually update:
Predicted fare
Surge probability

Label:
"Illustrative model scenario"

--------------------------------------------------
10. PAGE 6 — POLICY ANALYTICS
--------------------------------------------------

Purpose:
Make the platform valuable to government analysts and researchers.

Title:
"Policy & Market Analytics"

Sections:

A. NATIONAL APIx DECOMPOSITION

Waterfall:
Which routes contributed to today's national index change?

Example:
DEL-BOM +1.4
BOM-BLR +0.9
DEL-BLR +0.6
Others +0.9

B. REGIONAL VIEW

North
West
South
East
Central
Northeast

Show:
APIx
fare pressure
volatility

C. LEAD-TIME ELASTICITY

Compare routes.

D. VOLATILITY

Current
7-day
30-day

E. MARKET SEGMENTS

Business routes
Tourism routes
Metro routes
Regional connectivity

F. HOLIDAY / EVENT COMPARISON

Compare airfare behavior around:
Diwali
Holi
Eid
Christmas
New Year
long weekends

G. HISTORICAL ANALOGUES

"Current conditions resemble:"

1. Aug 2026
2. Nov 2025
3. Oct 2025

Show similar:
demand
weather
lead-time
fare movement

--------------------------------------------------
11. PAGE 7 — AUDIT & DATA TRUST
--------------------------------------------------

This must feel exceptionally credible.

Title:
"Audit & Data Trust"

Subtitle:
"Trace every number from source observation to published indicator."

TOP:
Data Quality Score
96.8%

Quote Validation
98.4%

Source Agreement
1.8% median difference

Methodology:
APIx-v1.2

Main visual:

SOURCE
 ↓
RAW QUOTE
 ↓
NORMALIZED
 ↓
DEDUPLICATED
 ↓
OUTLIER CHECK
 ↓
VALID OBSERVATION
 ↓
ROUTE INDEX
 ↓
NATIONAL APIx

SECTION — QUOTE AUDIT TABLE

Quote ID
Route
Airline
Observed at
Base fare
Tax
Fee
Total
Lead time
Status
Source
Methodology

Clicking a row opens a detailed drawer.

DETAIL DRAWER:
- raw observation
- normalized values
- validation decisions
- timestamps
- methodology version
- index contribution
- related events
- related model forecast

CRITICAL FEATURE:

"TRACE THIS NUMBER"

When clicking an APIx value:

117.4
↓
route contributions
↓
individual observations
↓
source records
↓
cleaning decisions

Create a visual provenance graph.

--------------------------------------------------
12. PAGE 8 — VALIDATION / BACKTEST
--------------------------------------------------

Purpose:
Demonstrate that the methodology has been tested historically.

Title:
"Validation & Backtest"

Top:
"Would APIx have behaved sensibly historically?"

Controls:
30D
90D
180D
1Y

Show:

APIx vs benchmark
- correlation
- MAPE
- directional accuracy
- turning point detection

MAIN CHART:
APIx vs benchmark line chart.

SECTION:
"Directional Consistency"

Cards:
Upward movements correctly detected
Downward movements correctly detected
Major anomalies detected

SECTION:
"Backtest Event Replay"

Select:
Historical event

Show:
event
fare movement
APIx response
prediction response

Add clear disclaimer:
"Backtesting evaluates methodology and directional consistency; it does not imply APIx is identical to the benchmark."

--------------------------------------------------
13. PAGE 9 — ASK APIx
--------------------------------------------------

This is the signature AI experience.

Title:
"Ask APIx"

Subtitle:
"Ask about airfare movement in natural language."

Make this NOT look like ChatGPT.

It should be an analytical investigation workspace.

LEFT:
Prompt examples:

"Why did Delhi–Mumbai airfare rise today?"

"Which routes are under the highest surge pressure?"

"Compare holiday airfare pressure this year vs last year."

"Which events affected Mumbai routes?"

"Should I expect upward fare pressure on DEL-BOM?"

RIGHT:
Investigation workspace.

When user asks:

"Why did Delhi–Mumbai airfare rise today?"

Show a structured investigation:

QUERY
DEL → BOM
T+7

SIGNALS CHECKED

✓ Fare history
✓ Comparable baseline
✓ Search demand
✓ Weather
✓ Flight operations
✓ Events
✓ Holidays
✓ Statistical association
✓ Evidence records

Then response:

DEL-BOM T+7 fares are 24.7% above the comparable baseline.

Primary associated signals:
1. Rising search demand
2. Higher operational disruption
3. Weather risk

Temporal association is strong, but causality is not established.

Buttons:
[Show chart]
[Show evidence]
[Trace calculation]

Use expandable evidence cards.

--------------------------------------------------
14. SARVAM VOICE EXPERIENCE
--------------------------------------------------

Sarvam should be integrated as a meaningful interface feature.

Add a microphone button globally.

User can say:

"Delhi se Mumbai ka airfare aaj kyun badh raha hai?"

or

"Maharashtra mein kaunse routes sabse zyada surge kar rahe hain?"

or

"Show me routes with high fare pressure."

Support Indian-language interaction where appropriate.

The UI should visibly indicate:

Listening...
Understanding...
Analyzing...
Response ready

Then show:
- interpreted request
- resulting dashboard navigation
- analytical response

Add a small language selector:
English
Hindi
Marathi
Tamil
Bengali
etc.

Do not make the voice interface gimmicky.

--------------------------------------------------
15. PAGE 10 — GOVERNMENT API EXPLORER
--------------------------------------------------

Title:
"Government Data Access"

Subtitle:
"Machine-readable access to airfare intelligence."

Show an API playground style interface.

Example endpoints:

GET /api/v1/index/latest

GET /api/v1/routes/DEL-BOM

GET /api/v1/routes/DEL-BOM?lead_time=T7

GET /api/v1/surge

GET /api/v1/events

GET /api/v1/forecast/DEL-BOM

GET /api/v1/audit/AX-20260909-00421

Left:
endpoint list

Middle:
request parameters

Right:
JSON response

Example:

{
  "route": "DEL-BOM",
  "lead_time": "T+7",
  "current_fare": 7480,
  "baseline": 5825,
  "surge_pct": 28.4,
  "pressure_score": 84,
  "methodology_version": "APIx-v1.2"
}

Also show:
- API version
- data timestamp
- methodology version
- data quality
- response schema

Add:
[Copy JSON]
[Download]
[OpenAPI]

--------------------------------------------------
16. PERSISTENT AI COPILOT
--------------------------------------------------

Instead of making the AI available only on one page, include a small "Ask APIx" button in the global header.

Click opens a right-side panel.

Example prompts:
- Why is this route surging?
- Compare this with last month.
- Show associated events.
- Explain this APIx movement.
- Forecast this route.
- Trace this metric.

The AI must navigate the application intelligently.

For example:
"Show me the cause of this surge."

→ open Event Intelligence with selected route/date.

"Show the evidence."

→ open Audit & Data Trust filtered to relevant observations.

--------------------------------------------------
17. LIVE VS DEMO DATA UX
--------------------------------------------------

Because the application will initially operate as a frontend prototype, support both clearly.

Create a global data mode indicator:

LIVE
or
DEMO / HISTORICAL SIMULATION

Never pretend synthetic information is live.

Demo data should feel realistic:
- timestamps
- route variation
- realistic fare distributions
- realistic anomalies
- realistic event relationships
- realistic forecasting outputs

When DEMO mode is active:
show a subtle label:
"Historical simulation for demonstration"

Live mode should show:
"Live market sample"

--------------------------------------------------
18. MOCK DATA REQUIREMENTS
--------------------------------------------------

Generate a rich local mock dataset.

Do NOT use obvious repetitive fake numbers.

Create:
- 20–30 representative Indian routes
- 5 lead-time buckets
- 30–365 days of historical data
- multiple airlines
- multiple fare observations per route
- intraday movement
- holiday effects
- weather effects
- disruption effects
- event effects
- random noise
- route-specific volatility
- route-specific price levels

Example route groups:

Business:
DEL-BOM
DEL-BLR
BOM-BLR
DEL-HYD
BOM-HYD

Tourism:
DEL-GOI
BOM-GOI
DEL-JAI
BOM-COK
DEL-IXU

Regional:
GAU-KOL
BLR-COK
HYD-MAA
CCU-BBI
DEL-LKO

Mock data should produce convincing charts rather than perfectly smooth trends.

Include occasional anomalies:
- sudden +10%
- sudden +20%
- sudden +35%
- recovery

Create corresponding contextual mock signals:
event
weather
holiday
delay rate
search interest

This allows every major screen to tell a coherent story.

--------------------------------------------------
19. FRONTEND INTERACTIONS
--------------------------------------------------

Every important dashboard element should be interactive.

Required:
- hover states
- tooltips
- drill-down
- filter transitions
- URL/deep-link state
- table sorting
- table filtering
- date selection
- route selection
- lead-time switching
- chart hover
- legend toggles
- expandable drawers
- copy buttons
- toast feedback
- loading states
- empty states
- error states

Never use instant 0ms state changes.

Use subtle:
- fade
- slide
- number transitions
- chart reveal
- drawer transition

Animation should communicate state and spatial continuity, not decorate.

Respect prefers-reduced-motion.

--------------------------------------------------
20. DATA VISUALIZATION
--------------------------------------------------

Use charts appropriate for analytical data:

- line charts
- area charts
- grouped bars
- stacked bars
- heatmaps
- waterfall charts
- scatter plots
- distribution plots
- route maps
- KPI sparklines
- anomaly bands
- event timelines

Avoid pie charts except where genuinely useful.

All charts need:
- labels
- legends
- hover tooltips
- meaningful units
- accessible contrast
- text alternative or accessible labeling

Do not rely on color alone.

--------------------------------------------------
21. HIGH-IMPACT VISUAL FEATURES
--------------------------------------------------

Implement these as polished signature components:

A. INDIA FARE HEATMAP
Geographic route pressure.

B. SURGE FINGERPRINT
Shows why a route is under pressure.

C. TRACE THIS NUMBER
Trace any KPI back to underlying observations.

D. FARE PRESSURE GAUGE
0–100.

E. BOOKING WINDOW CURVE
T+45 → T+1.

F. EVENT → AIRPORT → ROUTE → FARE GRAPH
Interactive causal-looking but explicitly labelled as association.

G. FORECAST RANGE
Actual vs predicted.

H. HISTORICAL ANALOGUE FINDER
"Today's situation resembles..."

I. WHAT-IF SIMULATOR
Change contextual conditions and show forecast response.

J. MARKET PULSE
Fast national indicator bar.

--------------------------------------------------
22. DESIGN DETAILS THAT MAKE IT LOOK PREMIUM
--------------------------------------------------

Use:
- subtle 1px borders
- very restrained shadows
- layered surfaces
- strong alignment
- consistent card heights
- compact analytical tables
- excellent number formatting
- contextual microcopy
- subtle hover elevation
- sticky navigation
- keyboard shortcuts if practical

Use iconography consistently.

Prefer outlined/sharp modern SVG icons over emoji.

No emoji as primary UI icons.

Use lucide-style iconography.

Use Indian rupee formatting:
₹7,480

Dates:
16 Sep 2026

Times:
14:08 IST

Numbers:
1,284

Percentages:
+28.4%

--------------------------------------------------
23. RESPONSIVE BEHAVIOR
--------------------------------------------------

Desktop:
optimized for 1280–1600px analytical workspace.

Tablet:
collapse sidebar into icon/navigation drawer.

Mobile:
stack analytical cards
maintain readable tables
allow horizontal scrolling only inside explicitly scrollable data tables
never create full-page horizontal scrolling

Touch targets:
minimum approximately 44px.

--------------------------------------------------
24. ACCESSIBILITY
--------------------------------------------------

Follow accessibility-first UI practices.

Must include:
- keyboard navigation
- visible focus state
- ARIA labels
- semantic buttons
- screen-reader friendly chart labels where possible
- sufficient color contrast
- non-color indicators
- accessible forms
- readable error messages

Do not remove focus outlines unless replaced with a clearly visible equivalent.

--------------------------------------------------
25. DEMO MODE / JUDGE MODE
--------------------------------------------------

Add a hidden or clearly labelled "Demo Mode" toggle for presentation.

When enabled:
preload an impressive scenario:

Scenario:
"Mumbai Airfare Surge"

Route:
DEL → BOM

Current:
₹7,480

Baseline:
₹5,825

Surge:
+28.4%

Pressure:
84

Search demand:
+18%

Weather:
High risk

Delay rate:
26%

Relevant event:
Mumbai airport disruption

Prediction:
₹7,350–₹7,700

Surge probability:
78%

Then allow the judge to follow:

National Pulse
→ Route
→ Surge
→ Why
→ Forecast
→ Evidence
→ Audit
→ Government API

This entire scenario should be internally consistent across every page.

--------------------------------------------------
26. MICROCOPY
--------------------------------------------------

Prefer analytical language.

Good:
"24.7% above comparable baseline"

"Temporal association detected"

"Forecast range"

"Data quality: 96.8%"

"Trace calculation"

"Current market pressure"

Avoid:
"AI magic"

"Revolutionary"

"Disrupting travel"

"Super smart"

"Powered by cutting-edge AI"

Do not over-market the product.

--------------------------------------------------
27. PRODUCT IDENTITY
--------------------------------------------------

Brand:
APIx

Full name:
Real-Time Airfare Price Index for India

Short description:
"An evidence-driven airfare intelligence platform for India."

Suggested logo treatment:
APIx

Subtext:
INDIA AIRFARE INTELLIGENCE

Minimal typographic mark.

Do not use airplane clip-art in the logo.

--------------------------------------------------
28. TECHNICAL FRONTEND EXPECTATIONS
--------------------------------------------------

Use a modern React-based implementation.

Prefer:
- TypeScript
- Tailwind CSS
- shadcn/ui or similarly polished component primitives
- Recharts or another robust charting library
- Lucide icons

Keep components reusable.

Create:
- Layout components
- KPI components
- Chart components
- Table components
- Map components
- Drawer components
- AI panel
- Voice interface
- Filter components
- Audit components

Keep styling centralized through semantic design tokens.

Do not hardcode random styling page by page.

--------------------------------------------------
29. IMPORTANT UX RULE
--------------------------------------------------

Do not make every page look like the same grid of cards.

Use hierarchy:
- large chart when chart is the focus
- large map when geography is the focus
- dense table when investigation is the focus
- timeline when event analysis is the focus
- forecast chart when prediction is the focus
- provenance graph when trust is the focus

Cards are containers, not the visual identity.

--------------------------------------------------
30. FINAL QUALITY BAR
--------------------------------------------------

The application should look credible enough to be presented as:

"An early-stage government-grade airfare intelligence observatory."

A judge should understand within 20 seconds:

1. India airfare is being monitored.
2. Routes can surge abnormally.
3. The system detects and explains these movements.
4. Future fare pressure can be estimated.
5. Every number is traceable.
6. The information can be consumed programmatically.
7. The system can be interacted with using natural Indian-language voice.

The final result must feel like a serious analytical platform rather than a student CRUD dashboard.

Prioritize:
visual hierarchy
analytical clarity
interaction quality
data density
trust
explainability
premium polish

--------------------------------------------------
31. OPTIONAL FREE / PUBLIC APIS FOR FUTURE DATA
--------------------------------------------------

These are optional sources that can later populate the interface.

Flight / travel:
- Amadeus for Developers — flight search and travel data
- Aviationstack — flight status and aviation operations

Weather:
- Open-Meteo — weather data

Government / official:
- data.gov.in — Indian government open datasets
- API Setu — government API ecosystem

News / events:
- GNews
- NewsData
- other permitted news APIs

Calendar:
- Nager.Date / public holiday APIs

Maps / geocoding:
- OpenStreetMap / Nominatim

Your existing paid AI services:
- Sarvam API for Indian-language speech / language interaction
- Grok API for analytical investigation and natural-language explanations

Important:
The frontend must work fully with local mock/demo data even without external APIs.
The UI should make live/demo data mode explicit.
Do not build any part of the interface that assumes an API will always be available.