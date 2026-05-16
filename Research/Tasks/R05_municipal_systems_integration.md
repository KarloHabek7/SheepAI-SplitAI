# R05: Existing Municipal Systems — Deep Integration Map

> **Category:** R_TECH (Technical Scouting — System Integration)
> **Time Box:** 15 minutes
> **Recommended Model:** Gemini 3.1 Pro High
> **Depends On:** None
> **Priority:** 🔴 Critical

## Objective

The pre-research (R03) identified that Split has multiple disconnected digital systems but lacked exact technical details. This task creates a **comprehensive integration map** — exact endpoints, data formats, authentication methods, and realistic integration strategies for each system. The goal: understand exactly what we can plug into, what we need to mock, and where the real seams are.

## Search Strategy

### System-by-System Deep Dive:

#### 1. Gradsko oko (Civic Issue Reporting)
- **Search:** "Gradsko oko Split API" / "Gradsko oko prijava" / site:split.hr gradsko oko
- **Find:** Exact submission workflow, required fields, photo upload specs, category taxonomy
- **Check:** Is there a public web form we can inspect? What HTTP requests does it make?
- **Goal:** Can we auto-generate a payload compatible with Gradsko oko?

#### 2. Moj Split / Otvoreni Grad
- **Search:** "Moj Split aplikacija" / "Otvoreni Grad Split" / site:mojsplit.hr
- **Find:** What services are available? Bill payments, permit tracking, subsidy applications?
- **Check:** Mobile app store listing for feature descriptions, user reviews for pain points
- **Goal:** What municipal workflows could an AI assistant help navigate?

#### 3. Split Parking (Smart Parking)
- **Search:** "Split Parking app API" / "Profico Split Parking" / "Nedap SENSIT Split"
- **Find:** How many zones? What data is shown to users? Real-time occupancy format?
- **Check:** Can we observe/scrape the web version of parking data?
- **Goal:** Could we display or predict parking availability?

#### 4. Promet Split (Public Transit)
- **Search:** "fleet.promet-split.hr" / "Promet Split vozni red" / "Promet Split GTFS"
- **Find:** Current schedule format, real-time tracking interface, route listing
- **Check:** Visit fleet.promet-split.hr — what data is visible? Any XHR/API calls?
- **Goal:** Can we at minimum display bus schedules even without an official API?

#### 5. GIS / Geoportal Split
- **Search:** "geoportal split" / "GIS split ArcGIS" / site:split.hr GIS
- **Find:** Available layers, ArcGIS REST endpoints, coordinate system used
- **Check:** Can we query building data, zoning (GUP), or points of interest?
- **Goal:** Can we overlay AI-classified issues on a real city map?

#### 6. City PDFs & Documents (for RAG)
- **Search:** site:split.hr filetype:pdf / "GUP Split PDF" / "prostorni plan Split"
- **Find:** Key documents that could be ingested into a RAG pipeline
- **Check:** PDF quality — are they machine-readable or scanned images?
- **Goal:** Create a catalog of 5–10 high-value PDFs for RAG ingestion

#### 7. Nextbike Split (GBFS)
- **Check:** `https://api.nextbike.net/maps/nextbike-live.json?city=441` (Split city ID)
- **Find:** Station locations, bike counts, availability data structure
- **Goal:** Confirm this as a real-time data source for demo

#### 8. National Data Portal (data.gov.hr)
- **Search:** "Split" on data.gov.hr CKAN API
- **Find:** Available datasets relevant to Split (demographics, budget, environment)
- **Goal:** Identify 2–3 datasets that could enrich our AI context

## Output Format

Write findings to `Research/Findings/R05_system_integration_findings.md`:

### Executive Summary
- Which systems can we genuinely integrate with?
- Which MUST be mocked?
- Where are the biggest opportunities for an AI "glue layer"?

### System Integration Matrix

| System | Data Available | Access Method | Auth Required? | Real-Time? | Integration Effort | MVP Strategy |
|---|---|---|---|---|---|---|
| Gradsko oko | [fields] | [Web form / API / scrape] | [Yes/No] | [Yes/No] | [Easy/Med/Hard] | [Integrate / Mock / Skip] |
| ... | ... | ... | ... | ... | ... | ... |

### Detailed Findings per System
For each system:
- **What data exists** (exact fields, formats)
- **How to access it** (URL, API endpoint, scraping strategy)
- **What's locked** (authentication, rate limits, legal concerns)
- **MVP integration strategy** (real data vs. realistic mock)
- **Modular expansion potential** (what could we add post-hackathon?)

### RAG Document Catalog
| Document | URL | Pages | Machine-Readable? | Topic | RAG Value |
|---|---|---|---|---|---|
| GUP Split | [URL] | [N] | [Yes/No/Partial] | [Zoning] | [High/Med/Low] |

### Implications for Ideation
- What kind of app would maximize use of the AVAILABLE (not locked) data?
- What integration pattern would allow modular expansion to locked systems later?
- Where would an AI layer add the most value as middleware?

### Sources
- Full list of URLs, API endpoints, and documentation consulted

## Out of Scope
- Do NOT actually build any integrations
- Do NOT write code
- Do NOT make product decisions
