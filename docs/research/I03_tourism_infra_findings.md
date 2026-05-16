# I03: Tourism vs. Infrastructure Balance — Ideation Results

> **Executed:** 2026-05-13 20:26
> **Creative Angle:** Solving the tourism-infrastructure friction
> **Agent Model:** Opus 4.6 (Thinking)
> **Research Inputs Used:** R01_split_vision_findings.md, R02_pain_points_findings.md

## Ideas Generated

### Idea 1: Split Flow (Park & Ride AI)
- **Pitch:** Proactive routing AI that dynamically intercepts tourists heading to the congested center and offers Park & Ride alternatives.
- **Target User:** Arriving tourists and suburban commuters.
- **Core AI Feature:** Predictive congestion modeling that triggers push notifications or dynamic in-app incentives (e.g., "Park outside the center now for a free bus ticket") when the historic core hits 85% capacity.
- **Differentiator:** Prevents the traffic jam *before* it happens, rather than just showing a red line on a map once you're stuck.
- **Feasibility:** 3 — Requires mocking real-time traffic and parking data, as Split Parking APIs are locked (R03).
- **Demo-ability:** 4 — Showing a dashboard that "flips" arriving users to a suburban lot is very impactful.
- **Judging Strengths:** Tackles the #1 infrastructure pain point (traffic in the core).

### Idea 2: Tišina A (Zona A Acoustic Monitor)
- **Pitch:** An app that turns residents' phones into a decentralized acoustic monitoring network to enforce noise rules in the historic core.
- **Target User:** Residents of Diocletian's Palace (Zona A) suffering from unchecked nightlife.
- **Core AI Feature:** Audio classification AI that distinguishes between "normal crowd chatter," "amplified music," and "shouting/vandalism," automatically logging breaches.
- **Differentiator:** Empowers residents with objective data against noisy terraces, bypassing the slow response times of municipal wardens.
- **Feasibility:** 4 — Running an audio classification model in the browser or via API is highly achievable.
- **Demo-ability:** 5 — Playing a loud noise during the pitch and watching the app instantly trigger a "Violation Detected" alert is incredibly visceral.
- **Judging Strengths:** Directly addresses the "mass tourism extreme" pain point; very high demo impact.

### Idea 3: Dynamic Waste Router (Tourist Density Integration)
- **Pitch:** Dynamically schedules garbage truck routes based on real-time tourist density and Airbnb bookings, rather than static schedules.
- **Target User:** Čistoća (Waste Management) dispatchers.
- **Core AI Feature:** AI that correlates upcoming Airbnb/flight arrivals with historical waste generation to predict which neighborhoods will need extra pickups next week.
- **Differentiator:** Moves the city from reactive (picking up after bins overflow) to predictive (emptying them before the weekend rush).
- **Feasibility:** 3 — Requires combining mock booking data with mock waste data.
- **Demo-ability:** 3 — A heatmap of the city predicting waste hotspots is cool, but less interactive than consumer apps.
- **Judging Strengths:** Great alignment with the city's EBRD Green Cities initiative (R01).

## Cross-Pollination Notes
- **Split Flow** relies heavily on the parking data constraints identified in R03.
- **Tišina A** and the **Gradsko oko Vision AI** (I01) could be combined into one unified "Citizen Sensor App" that handles both audio and visual reports.

## Research Gaps Noticed
- The exact geographic boundaries of "Zona A" and current official noise limits need to be verified to make Tišina A highly realistic.
