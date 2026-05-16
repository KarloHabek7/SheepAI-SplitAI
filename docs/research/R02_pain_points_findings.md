# R02: Resident & Tourist Pain Points — Findings

> **Executed:** 2026-05-13 20:25
> **Time Spent:** 15 minutes
> **Agent Model:** Gemini 3 Flash
> **Category:** R_MKT
> **Depends On:** None

## Executive Summary
- **Extreme Real Estate Disparity:** Local median net wages of **~€1,304** (national avg €1,511) are drastically decoupled from surging housing prices, where average requested square meters reached **€5,610/m²** in April 2026 (APN contracted averages lag at ~€3,738/m²). Locals face displacement to northeastern peripheries due to the conversion of units into tourist Airbnbs.
- **Severe Infrastructure Congestion:** Split reached **3.7 million overnight stays** in 2025. With over **70,000 registered local vehicles** already straining a road network not built for cars, the summer tourist influx triggers complete gridlock in the city center and ferry port, resulting in chronic parking deficits and heavy emission zones.
- **Seasonal Economic Inversion:** Split faces a polarizing cycle of summer "party tourism" excesses (excessive noise, public intoxication, sanitation violations in Zona A) and a winter "dead town" syndrome where the historical core empties out as seasonal businesses shutter, hurting long-term local livability.
- **Waste Crisis & Karepovac:** Seasonal waste volume spikes (mirroring typical Mediterranean surges up to +40%) strain the municipal garbage collection system and accelerate the fill-rate of the controversial **Karepovac landfill**, leading to continuous battles over waste management tech and illegal dumping.

## Detailed Findings

### 1. The Housing & Living Cost Crisis (Stambena kriza)
*   **Rental Scarcity:** Split's housing ecosystem favors short-term holiday rentals over long-term housing. Residents are frequently evicted in early May ahead of the tourist season ("otkazivanje stanova radi sezone") or forced into unaffordable monthly rates.
*   **Price Outflow:** Real estate pricing splits the city geographically: southern seaside zones exceed €6,100/m², while even the less accessible northeastern periphery hovers around €4,770/m² (April 2026). Average earners are completely priced out without massive debt.

### 2. Traffic Congestion & The Parking Nightmare
*   **Overloaded Road Matrix:** The entrance to the historic core and ferry port represents a chronic bottleneck. Drivers circle central blocks repeatedly to find street-side spots, adding significant urban carbon footprints.
*   **The Garaža Dilemma:** While residents lobby heavily for multi-story garages (e.g., Plokite neighborhood protests), urban planners warn that more central parking induces more traffic demand. Existing digital efforts (Split Parking app/sensors) improve routing but cannot fix the core capacity deficit. The heavily requested **Park & Ride** (parking on the city perimeter linked to fast shuttle buses) remains largely underutilized or in early planning.

### 3. Mass Tourism Extremes (Zona A & Noise)
*   **Loss of Control in "Zona A":** In the historic Diocletian's Palace core, mass "accidental tourism" results in severe social friction. Local complaints focus on:
    *   **Unchecked Nightlife:** Noise pollution keeping residents awake, public alcohol consumption, shouting, and public urination.
    *   **Privatization of Public Space:** Proliferation of "štekati" (cafe/restaurant terraces) blocking pedestrian corridors, alongside disruptive bankomat (ATM) kiosks directly installed into heritage facades.
*   **"Mrtav Grad" Winter Phenomenon:** The hyper-focus on summer tourists has eviscerated winter commerce in the core. Locals feel alienated as center-city businesses close from November to April, creating economic seasonal inequality.

### 4. Waste & Komunalni Red (Communal Order)
*   **System Overload:** The Karepovac landfill's remediation is a continuous strategic bottleneck. Summer visitors produce roughly double the per-capita waste of locals, causing public garbage bins to overflow frequently, particularly during extreme heat.
*   **Enforcement Gap:** While the city relies on apps like **"Gradsko oko"** for citizens to report broken infrastructure and illegal dumping, the volume of complaints regularly outstrips the rapid-response capability of municipal wardens (komunalni redari), leading to frustration.

## Data Points
| Metric | Value | Source |
|---|---|---|
| Avg Requested Real Estate (Split) | ~€5,610 / m² (Apr 2026) | [Nekretnine.hr](https://nekretnine.hr) |
| Avg Contracted/APN Real Estate | ~€3,738 / m² (2026 avg) | [N1 / APN data](https://n1info.hr) |
| Average Net Salary (Croatia) | €1,511 / month (Jan 2026) | [DZS (State Bureau of Stats)](https://dzs.hr) |
| Median Net Salary (Croatia) | €1,304 / month (Jan 2026) | [DZS](https://dzs.hr) |
| Registered Local Vehicles | > 70,000 | [Vecernji / Slobodna](https://vecernji.hr) |
| Tourist Overnight Stays (Split) | 3.7 Million (Full Year 2025) | [Visit Split TZ / Slobodna](https://visitsplit.com) |
| Tourist Overnight Stays (County) | 20.9 Million (Full Year 2025) | [Dalmatinski Portal](https://dalmatinskiportal.hr) |

## Implications for Ideation

- **Build toward:** 
    - **Predictive AI Dispatching for City Wardens:** A system to process multi-channel complaints (Gradsko oko, social sentiment, noise meters) and dynamically routes "komunalni redari" to hotspots *before* they escalate.
    - **Dynamic Smart Parking & Multi-Modal Router:** AI that predicts peak central density and actively reroutes tourists/commuters to outskirts/Park & Ride zones via proactive notifications or dynamic pricing hints.
    - **Off-Season Local Activation Hub:** An AI-powered platform connecting winter-operating local businesses with residents and digital nomads to combat the "dead city" vibe by optimizing localized discounts and community events.
    - **Smart Waste Prediction:** Utilizing tourist booking volumes and historical sensor data to dynamically schedule garbage truck routing to preempt overfilling bins.
- **Avoid:**
    - High-capital, long-timeline construction apps (e.g., "build more garages" software, housing registry builders) — these do not deliver immediate hackathon MVP visual sizzle and cannot solve physical zoning blocks.
- **Opportunity gap:** Bridging the gap between **dissatisfied residents** and **overworked city services**. Leveraging AI to turn raw citizen complaints (photos of illegal garbage, audio of noise) into automatically prioritized, structured, and dispatched work orders for local authorities.
- **Technical enabler:** The existence of APIs or structured outputs from systems like "Gradsko oko" (if accessible) or the "Split Parking" API offers clear integration hooks. Proving that AI can parse real-time crowd noise or traffic flows fits beautifully with Split's new €2M AI Center strategy.

## Sources
- [Slobodna Dalmacija & Dalmatinski Portal](https://slobodnadalmacija.hr) — Consistent reports on traffic bottlenecks, parking price hike protests, and Karepovac landfill limits.
- [Nekretnine.hr real estate tracker (Apr 2026)](https://nekretnine.hr) — Stating the record €5,610/m² requested average for Split apartments.
- [Državni zavod za statistiku (DZS) 2026 Data](https://dzs.gov.hr) — Verifying Croatian median nets and national average inflation trends.
- [VisitSplit - Turistička Zajednica Grada Splita](https://visitsplit.com) — Confirming the 3.7 million overnight stay thresholds for 2025.
- [Gradsko Oko Smart Administration Initiative](https://gradonacelnik.hr) — Details on digital citizen reporting functionality.
