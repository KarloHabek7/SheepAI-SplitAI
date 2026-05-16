# R04: Real Citizen & Tourist Complaints — Findings

> **Executed:** 2026-05-16T10:50:00Z
> **Time Spent:** 15 minutes
> **Agent Model:** Gemini 3.1 Pro (High)

## Executive Summary
- **Overtourism & Public Order:** Residents in the historic center are extremely frustrated by noise, public urination, and vomiting from party tourists, describing life there as "almost impossible."
- **Broken Digital Transit:** The "Promet Split" app is widely criticized for inaccurate real-time tracking, frequent crashes, and unreliability, leaving users guessing when buses will actually arrive.
- **Unresponsive Municipal Reporting:** The "Gradsko oko" app suffers from a perception that reports go unresolved for months. The 7-day SLA is often met only with administrative updates, not actual physical fixes.
- **Overcrowding & Pricing:** Tourists primarily complain about the intense crowding around Diocletian's Palace and high peak-season prices that feel like "tourist traps."

## Detailed Findings

### Resident Complaints

#### 1. Public Order & "Party Tourism"
- **Number of complaints found:** Hundreds across Reddit, local portals (Dalmacija Danas, Slobodna Dalmacija).
- **Representative quotes:**
  - *"Život u centru grada postao je gotovo nemoguć zbog buke i pijanih ispada do ranih jutarnjih sati."*
  - *"Grad se pretvara u destinaciju za cjelonoćne zabave na štetu lokalnog stanovništva."*
- **Common proposed solutions:** Stricter enforcement of fines by komunalni redari (municipal wardens), more police patrols, shifting tourism strategy.
- **Emotional temperature:** Rage / High intensity. Residents feel abandoned in favor of tourism revenue.

#### 2. Waste Management & Infrastructure
- **Number of complaints found:** Very high, constantly recurring topic.
- **Representative quotes:**
  - *"Karepovac je pod velikim pritiskom, smeće se gomila, a komunalne usluge pucaju ljeti."*
  - *"Stalni radovi prije sezone i manjak parkirnih mjesta stvaraju ljetni kolaps."*
- **Common proposed solutions:** Better waste sorting, faster completion of the Lećevica waste management center, building more parking garages.
- **Emotional temperature:** High frustration / Exhaustion.

### Tourist Complaints

#### 1. Overcrowding & Tourist Traps
- **Number of complaints found:** Common on TripAdvisor, Reddit (r/travel).
- **Representative quotes:**
  - *"Diocletian's Palace is beautiful but absolutely swamped with people in July and August."*
  - *"Watch out for 'tourist taxes' and overpriced restaurants near the Riva."*
- **Common proposed solutions:** Recommending shoulder seasons (May/September), avoiding peak midday cruise ship crowds.
- **Emotional temperature:** Mild annoyance to moderate frustration.

#### 2. Public Transit Reliability
- **Number of complaints found:** Frequent app store and Reddit complaints.
- **Representative quotes:**
  - *"The bus tracking doesn't work, we waited 40 minutes for a bus that the app said was arriving."*
- **Common proposed solutions:** Relying on Uber/taxis or asking locals instead of using the app.
- **Emotional temperature:** Moderate frustration.

### Digital Service Frustrations
- **Promet Split (Transit App):** Users rate it poorly due to inaccurate arrival times, lack of functioning real-time tracking, and technical instability (crashing, login issues). Users often advise checking the static web timetable instead.
- **Gradsko oko (Reporting App):** Introduced in 2019 to report issues, but citizens complain that problems sit unresolved for months. The system's 7-day feedback loop often just confirms receipt or forwards it, but doesn't fix the pothole or remove the abandoned car. Efficacy is entirely dependent on the responsiveness of backend municipal services, which is lacking.

## Pain Point Ranking
| Rank | Pain Point | Frequency | Intensity | Addressable by AI? | Notes |
|---|---|---|---|---|---|
| 1 | Public Order (Noise/Urinating) | High | High | Partial | AI can optimize warden patrols (predictive dispatch) or identify hotspots via acoustic/camera sensors. |
| 2 | Unreliable Transit App | High | Med | Yes | AI could improve ETA predictions by processing real-time traffic and historical data. |
| 3 | Ignored Municipal Reports | High | High | Yes | AI could triage "Gradsko oko" reports, auto-route them, detect duplicates, and estimate fix times. |
| 4 | Waste Accumulation | High | High | Partial | AI routing for garbage trucks based on fill-level predictions or reporting data. |
| 5 | Tourist Overcrowding | High | Med | Yes | AI crowd management suggesting alternative routes/times for tourists. |

## Implications for Ideation
- **Build toward:** A unified "smart dispatch" or triage system. The core issue with "Gradsko oko" isn't the app itself, but the *backend processing*. An AI that triages complaints, auto-dispatches the right service, and groups identical reports could solve the bottleneck. For tourists, a better transit ETA predictor is desperately needed.
- **Avoid:** Just building "another reporting app." Citizens already have one, they hate that it doesn't lead to action.
- **Opportunity gap:** Addressing the "party tourism" through predictive analytics for *komunalni redari*, allowing them to be in the right place at the right time.
- **Technical enabler:** Integrating the fragmented data from Promet, Čistoća, and Gradsko Oko into a single LLM-powered command center could address these frustrations by breaking data silos.

## Sources
- Reddit r/croatia & r/Split - Discussions on "Gradsko oko", parking, and season.
- Dalmacija Danas - Articles and citizen reports on tourist behavior in the center.
- Apple App Store & Google Play - Reviews of the "Promet Split" application.
- Reddit r/travel & TripAdvisor - Discussions on overcrowding and prices in Split.
