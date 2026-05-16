# R04: Real Citizen & Tourist Complaints — Voice of the Street

> **Category:** R_MKT (Market Research — Primary Source Validation)
> **Time Box:** 15 minutes
> **Recommended Model:** Gemini 3.1 Pro High
> **Depends On:** None
> **Priority:** 🔴 Critical

## Objective

Go beyond the statistical overview from pre-research (R02) and gather **actual citizen and tourist complaints** from primary sources. We need to hear the real voices — what exact problems do people complain about, in their own words? This grounds our solution in lived experience, not abstract data.

## Search Strategy

### For Resident Complaints:
1. **Reddit r/croatia and r/Split** — Search for threads about:
   - "Split problemi" / "Split komunalno" / "Split parkiranje" / "Split buka"
   - "Gradsko oko iskustva" / "Moj Split aplikacija"
   - "Split sezona" / "apartmanizacija Split"
   - Recent threads (2024–2026) about frustrations with city services
2. **Forum.hr** — The "Split" subforum and "Čavrljanje i druženje" threads discussing:
   - Experiences with municipal services
   - Complaints about tourist overcrowding
   - Frustrations with digital city services
3. **Google Reviews / TripAdvisor** — Search for:
   - 1–2 star reviews of Split as a destination (tourist pain points)
   - Reviews of specific city services (Promet Split app, parking, Čistoća)
4. **Facebook groups** — "Split problemi," "Građani Splita," "Turistička zajednica Split" complaint threads
5. **Slobodna Dalmacija / Dalmatinski Portal** — Reader comment sections on articles about:
   - Traffic congestion
   - Waste management
   - Noise complaints in Zona A
   - Municipal service response times

### For Tourist Complaints:
1. **TripAdvisor Split forum** — "Things to be aware of" type posts
2. **Google Maps reviews** — of Diocletian's Palace, Riva, Split bus station, ferry terminal
3. **Reddit r/travel** — "Split Croatia" threads mentioning frustrations
4. **Booking.com / Airbnb** — Reviews mentioning city-level issues (noise, cleanliness, transport)

### Structured Data to Extract:
For each complaint cluster, record:
- **Verbatim quote** (translated if needed)
- **Source URL**
- **Date**
- **Complaint category** (transport, waste, noise, bureaucracy, digital services, safety, etc.)
- **Emotional intensity** (mild annoyance → rage)
- **Proposed solution (if any)** — what did the person wish existed?

## Output Format

Write findings to `Research/Findings/R04_citizen_complaints_findings.md` using this structure:

### Executive Summary
- 3–5 bullet points: What are the TOP complaints by frequency and intensity?

### Detailed Findings

#### Resident Complaints (grouped by theme)
For each theme:
- **Number of complaints found**
- **Representative quotes** (3–5 per theme)
- **Common proposed solutions from citizens themselves**
- **Emotional temperature** (how angry are people?)

#### Tourist Complaints (grouped by theme)
Same structure as above.

#### Digital Service Frustrations
- Specific complaints about existing apps (Moj Split, Gradsko oko, Split Parking, Promet Split)
- What features are missing? What's broken? What's confusing?

### Pain Point Ranking
| Rank | Pain Point | Frequency | Intensity | Addressable by AI? | Notes |
|---|---|---|---|---|---|
| 1 | [Pain point] | [High/Med/Low] | [High/Med/Low] | [Yes/Partial/No] | [Notes] |

### Implications for Ideation
- Which pain points are both HIGH frequency and HIGH intensity?
- Which ones are specifically solvable with AI (not just "build more roads")?
- What do citizens **wish existed** that doesn't?
- What are tourists asking for that Split doesn't provide digitally?

### Sources
- Full list of URLs consulted

## Out of Scope
- Do NOT make a final decision — that's `/ideate`
- Do NOT write any application code
- Do NOT evaluate ideas against each other — just gather and organize evidence
- Do NOT fabricate complaints — only use real sources (if a source is inaccessible, note it as a gap)
