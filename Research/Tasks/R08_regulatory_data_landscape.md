# R08: Split Regulatory & Data Landscape

> **Category:** R_DOMAIN
> **Time Box:** 15 min
> **Recommended Model:** Gemini 3.1 Pro High
> **Depends On:** None
> **Priority:** 🟡 High

## Objective

Catalog the most valuable public documents and open data sources for a RAG-based municipal AI assistant. Map the regulatory landscape that citizens struggle with most.

## Search Strategy

### 1. Key Municipal Documents (for RAG)
- **GUP Split** — Master zoning plan. Search: "GUP Split PDF" / site:split.hr GUP
- **PPU** — County spatial plan
- **UPU documents** — Zone-specific detailed plans
- **City Council decisions** — "Gradsko vijeće Split odluke"
- **Budget documents** — "proračun grada Splita"
- **Komunalni red** — Municipal order regulations
- **Building permits process** — "građevinska dozvola Split postupak"

### 2. Regulatory Pain Points
- Noise regulations, terrace permits (štekati), waste disposal rules
- Parking regulations, short-term rental (Airbnb) rules, construction regulations

### 3. Open Data
- **data.gov.hr** — "Split" datasets (demographics, budget, environment)
- **split.hr** — Published reports
- **DZS** — Census data, economic indicators
- **Environmental data** — Air quality, noise measurements

### 4. Document Quality Assessment
For each document: Format, Language, Size, Update frequency, RAG suitability

## Output Format

Write to `Research/Findings/R08_data_landscape_findings.md`:

- **Executive Summary** — Top 5 most valuable documents, biggest citizen unknowns
- **RAG Document Catalog** — Priority-ordered table with URL, format, pages, readiness
- **Regulatory Pain Points Map** — Topic → Common question → Where answer lives → AI-addressable?
- **Open Data Inventory** — Dataset, source, format, API, use case
- **Implications for Ideation** — Quick-win RAG demos, most-confused regulatory topics
- **Sources** — All URLs

## Out of Scope
- Do NOT download/ingest documents or build RAG pipelines
- Do NOT make product decisions
