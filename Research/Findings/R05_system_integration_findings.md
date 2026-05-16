# R05: Existing Municipal Systems — Deep Integration Map — Findings

> **Executed:** 2026-05-16T10:48:00+02:00
> **Time Spent:** 15m
> **Agent Model:** Gemini 3.1 Pro (High)

## Executive Summary
- **Genuine Integrations:** Very few. The city relies heavily on closed, proprietary systems built by local IT agencies (Profico, RI-ING NET).
- **Mock Requirements:** Almost all real-time operational systems (Gradsko oko, Split Parking, Smart City Split) lack public developer APIs and MUST be mocked for the hackathon MVP.
- **Biggest AI Opportunity:** Creating an "AI Middleware/Super-App" layer. Since systems are fragmented (separate apps for parking, bus, reporting, bills), an AI assistant can serve as the unified conversational interface, executing actions via mocked plugin endpoints that represent future official API integrations.

## System Integration Matrix

| System | Data Available | Access Method | Auth Required? | Real-Time? | Integration Effort | MVP Strategy |
|---|---|---|---|---|---|---|
| Gradsko oko | Comm. issues, photos, status | Closed (Web/App only) | Yes | Yes | Hard | Mock |
| Smart City Split | Bills, civic info | Closed (App/Portal) | Yes | Yes | Hard | Mock |
| Split Parking | Occupancy, prices | Closed (IGEUS platform) | No | Yes | Hard | Mock |
| Promet Split | Bus locations, schedules | Undocumented XHR/Email req | No | Yes | Med | Mock / Reverse-Eng |
| GIS / Geoportal | Zoning (GUP), green areas | Web Portal / PDF | No | No | Med | Static GeoJSON/RAG |
| Nextbike (Tier) | Bike station status | GBFS (Currently empty) | No | Yes | Low | Mock |

## Detailed Findings per System

### 1. Gradsko oko (Civic Issue Reporting)
- **Data:** Issue locations, categories, photos, and resolution status.
- **Access:** Developed by RI-ING NET. Completely closed; no public API. Submissions require user registration.
- **MVP Strategy:** We must mock a submission endpoint (`POST /api/mock/gradsko-oko`) to simulate the AI filing a report on behalf of the user.

### 2. Moj Split / Smart City Split
- **Data:** Central hub for paying municipal bills and accessing city services.
- **Access:** Mobile apps and `smartcity.split.hr` web portal. Closed ecosystem.
- **MVP Strategy:** Mock an authentication and data-retrieval flow to demonstrate how an AI could summarize a user's pending bills.

### 3. Split Parking (Smart Parking)
- **Data:** Real-time occupancy via sensors, zoning, and pricing.
- **Access:** Built by Profico, integrated with the IGEUS payment platform. Closed API.
- **MVP Strategy:** Generate a mock dataset of parking zones and occupancy levels that the AI can query to recommend parking.

### 4. Promet Split (Public Transit)
- **Data:** Bus routes, schedules, real-time vehicle locations.
- **Access:** `fleet.promet-split.hr` shows real-time tracking, but GTFS data isn't openly published for download (requires direct email request to Promet Split).
- **MVP Strategy:** We could reverse-engineer the XHR requests from `fleet.promet-split.hr` for real-time data, but mocking a simplified bus schedule is safer for the MVP.

### 5. GIS / Geoportal Split
- **Data:** Spatial plans, zoning maps.
- **Access:** Available via `zpu-split.hr` (Zavod za prostorno uređenje) and `split.hr`.
- **MVP Strategy:** Export key layers (e.g., public trash cans, green zones) as static GeoJSON files to feed into the app's map view.

### 6. Nextbike Split (GBFS)
- **Data:** Expected to provide bike availability.
- **Access:** The provided endpoint (`https://api.nextbike.net/maps/nextbike-live.json?city=441`) currently returns an empty payload (`{"countries":[]}`). Nextbike was acquired by Tier, so the feed location may have changed.
- **MVP Strategy:** Mock the bike availability data.

### 7. National Data Portal (data.gov.hr)
- **Data:** Various demographic and administrative datasets.
- **Access:** Open data portal.
- **MVP Strategy:** Use to enrich context, but not critical for real-time operations.

## RAG Document Catalog

| Document | URL | Pages | Machine-Readable? | Topic | RAG Value |
|---|---|---|---|---|---|
| GUP Split (Odredbe) | split.hr / zpu-split.hr | Varies | Partial (PDF) | Urban Rules | High |
| PPUG Split | split.hr / zpu-split.hr | Varies | Partial (PDF) | Urban Rules | High |
| Odluka o kom. redu | split.hr (Glasnik) | Varies | Yes | Civic Rules | High |

## Implications for Ideation
- **Build toward:** A "Unified Civic Assistant" (Super-App). Since the data is heavily siloed across closed systems, the biggest value proposition is an AI that handles the fragmentation. The AI parses the user's natural language request ("A tree fell on my car") and routes it to the correct simulated subsystem (Gradsko oko, Parking, etc.).
- **Avoid:** Relying on live API integrations for the demo. Building scrapers will eat up hackathon time and be brittle.
- **Opportunity gap:** RAG on city rulebooks (GUP, komunalni red). Since real-time API data is hard to get, we can excel by making the AI extremely knowledgeable about the *rules* of Split, which are freely available as PDFs.
- **Technical enabler:** Designing a robust "Tool/Function Calling" architecture for Gemini, where `submit_gradsko_oko_report` and `check_parking_availability` are clearly defined tools that return mocked JSON responses.

## Sources
- Gradsko oko portal (split.oko.hr)
- Smart City Split (smartcity.split.hr)
- Profico Split Parking case studies
- Promet Split (fleet.promet-split.hr)
- Zavod za prostorno uređenje Grada Splita (zpu-split.hr)
- data.gov.hr
- Nextbike GBFS JSON endpoint
