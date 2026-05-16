# R03: Digital Infrastructure & Open Data in Split — Findings

> **Executed:** 2026-05-13 20:20:00
> **Time Spent:** 15 minutes
> **Agent Model:** Gemini 3.5 Flash

## Executive Summary
- **Fragmented Digital Ecoystem:** Split has multiple disconnected smart systems (Promet Split, Split Parking, Otvoreni Grad) but no centralized developer portal or unified data API.
- **Open Data Resistance:** Major public utility entities (like Promet Split) actively withhold standardized open data (like GTFS feeds) despite public pressure, creating a severe data integration bottleneck for third-party developers.
- **Rich, Static GIS Assets:** The city possesses an advanced ArcGIS system with 3D models, solar rooftop potentials, and deep spatial planning layers which are accessible but historically underutilized by consumer apps.
- **Standardized Bike-share (Nextbike):** Unlike transit and parking, Split's public bike network adheres to the global GBFS (General Bikeshare Feed Specification), enabling instant real-time API consumption.

## Detailed Findings

### 1. Public Transit — Promet Split
- **Status:** Buses are equipped with real-time IoT trackers, visible to the public via the official app and `fleet.promet-split.hr`.
- **API Access:** Highly restricted. The transit authority refuses to publish a public-facing GTFS (General Transit Feed Specification) feed, actively defending this stance against Right to Access Information requests.
- **Current Usage:** Data is locked inside the official Promet Split mobile app. Third-party transit aggregators like Moovit manage limited integration, likely through customized agreements or data scraping.

### 2. Smart Parking — Split Parking d.o.o.
- **Technology:** A city-wide network utilizing **Nedap SENSIT** wireless magnetic bay sensors to track physical parking occupancy. 
- **Partners:** Software and the mobile application were custom-built by local agency **Profico**; Ericsson Nikola Tesla serves as the master system integrator.
- **API Access:** No public API is published for third-party developer use. Real-time status and occupancy info are displayed exclusively in the official "Split Parking" mobile app and dynamic road signs.

### 3. Geoportal / GIS System
- **Data Offered:** Split operates a robust 3D city GIS portal leveraging Esri's ArcGIS technology.
- **Key Layers:** Solar potential on rooftops, urban planning maps (GUP, PPU, UPU), real-estate registry, water utilities, and communal infrastructure maintenance tracking.
- **API Access:** Highly detailed maps available online, though integrating with raw geospatial vector data requires ArcGIS-compatible service connections.

### 4. Moj Split (Otvoreni Grad)
- **Functionality:** A unified citizen-administration platform accessible via web and app.
- **Features:** Bill payment tracking, municipal issue reporting, public finance transparency module ("iTransparentnost"), and participatory budgeting modules.
- **API Access:** Proprietary portal, no public APIs provided for programmatic oversight or external dashboards.

### 5. National Open Data Portal (data.gov.hr)
- **Status:** Croatia's central open data repository, running on the open-source **CKAN** software platform. 
- **Data for Split:** Split-related datasets (demographics, environment, budgets) must be pulled via CKAN's standard REST API from this central repository rather than a dedicated local portal.

## Data Points

| Metric | Value | Source |
|---|---|---|
| Parking Sensor Data | Real-time occupancy via Nedap SENSIT | [Split Parking Tech](https://www.parking.net/news/ericsson-nikola-tesla-wins-split-smart-parking-contract) |
| Bus Location Availability | Real-time tracking available (Proprietary UI) | [fleet.promet-split.hr](https://fleet.promet-split.hr) |
| GTFS Feed Availability | **Non-existent / Refused** | [Right to Info Request (imamopravoznati.org)](https://imamopravoznati.org) |
| Nextbike (Micromobility) Feed | Live GBFS Endpoint supported | [Nextbike Live JSON](https://api.nextbike.net/maps/nextbike-live.json) |
| National API Platform | CKAN JSON-API compliant | [data.gov.hr API Docs](https://data.gov.hr) |

## Implications for Ideation

- **Build toward:** 
  - **Unified City AI Layer:** Build an AI middleware or conversational agent that bridges the current silos. An AI that acts as a single point of contact, handling routing (scraped bus/parking data) and citizen queries (Moj Split data) through a natural conversational flow.
  - **Intelligent Urban Assistant:** Leveraging GIS layers (solar, parks) and real-time Nextbike feeds to offer optimized, eco-conscious routes or property evaluation assistants.
- **Avoid:** 
  - Apps completely reliant on a stable, officially supported, high-frequency public transit API. You must have a contingency to parse or simulate schedules due to the active refusal of a GTFS feed.
- **Opportunity gap:**
  - The massive frustration surrounding Split's disconnected apps (one for bus, one for parking, one for administration) presents a clear opening for an **Agile Aggregator**. If an AI tool can gracefully "talk" to these systems, it will offer far superior UX.
- **Technical enabler:**
  - **GBFS (Nextbike):** Provides a ready-to-integrate, highly predictable dataset for demonstrating real-time analytics, availability heats maps, or predictive AI-driven maintenance models.
  - **CKAN API (National Portal):** Provides solid historical datasets to feed an AI context-engine for analyzing local trends and budgets.

## Sources
- [Ericsson Nikola Tesla & Split Parking](https://www.ericssonnikolatesla.com) — Information on smart parking integration.
- [Nextbike API Ecosystem](https://api.nextbike.net/maps/nextbike-live.json) — Global GBFS feed listing including Croatian networks.
- [Right to Information Portal (imamopravoznati.org)](https://imamopravoznati.org) — Records regarding the transit authority's refusal to provide public GTFS feeds.
- [Grad Split GIS Portal](https://www.split.hr) — Geographic and infrastructural assets owned by the city.
