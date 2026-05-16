# R08: Split Regulatory & Data Landscape — Findings

> **Executed:** 2026-05-16T10:50:00+02:00
> **Time Spent:** 15 min
> **Agent Model:** Gemini 3 Flash
> **Category:** R_DOMAIN
> **Depends On:** None

## Executive Summary
- **The Core RAG Pillars:** The top 5 most valuable municipal documents for an intelligent civic AI assistant are the **General Urban Plan (GUP Splita)**, the **Communal Order Decision (Odluka o komunalnom redu)**, **City Council Decisions (Službeni glasnik Grada Splita)**, the **Municipal Budget (Proračun Grada Splita)**, and the **Detailed Urban Plans (UPU-i na snazi)**.
- **The Citizen Information Chasm:** Citizens and entrepreneurs face immense difficulty navigating multi-page PDF documents written in complex bureaucratic terminology. The biggest unknowns surround building permits (UPU/GUP zoning exceptions), terrace/outdoor seating rules (*štekati*), short-term rental regulations, and waste disposal schedules.
- **Regulatory Volatility:** A critical example of regulatory complexity occurred in late 2025 when the High Administrative Court overturned the city's previous Communal Order (Službeni glasnik 66/23). Citizens and business owners are frequently left unaware of which exact iteration of municipal bylaws is actively enforceable.
- **Open Data Reality:** While structured API access from utility silos is restricted (as uncovered in R03), official documents published in *Službeni glasnik* and data on *data.gov.hr* (such as city property inventory and financial transparency records) offer clean, verifiable text and tabular data perfectly suited for LLM ingestion and vector indexing.

## RAG Document Catalog
| Document Title | Primary URL / Source | Format | Est. Volume / Pages | Update Frequency | RAG Readiness / Ingestion Notes |
|---|---|---|---|---|---|
| **GUP Splita (General Urban Plan)** | [split.hr/prostorno-planska-dokumentacija](https://www.split.hr/prostorno-planska-dokumentacija) | PDF (Text + GIS vector maps) | ~250+ pages (Provisions) | Multi-year cycles (Amendments) | **Medium-High:** Dense legal provisions; chunking by article and urban rule zones (*urbana pravila*) required. |
| **Odluka o komunalnom redu (Communal Order)** | [split.hr/sluzbeni-glasnik](https://www.split.hr/sluzbeni-glasnik) | PDF / HTML | ~60 pages | Annual / Court revisions | **High:** Highly structured articles detailing municipal fines, terrace permits (*štekati*), and facade rules. Perfect for direct Q&A. |
| **Proračun Grada Splita (Municipal Budget)** | [split.hr/strateski-dokumenti](https://www.split.hr/strateski-dokumenti) | PDF / Excel | ~150 pages & tables | Annual + Periodic rebalances | **Medium:** Contains numerical tables and project allocations. Excellent for tabular RAG parsing. |
| **Službeni glasnik (City Gazette Acts)** | [split.hr/sluzbeni-glasnik](https://www.split.hr/sluzbeni-glasnik) | PDF repository | Thousands of acts | Bi-weekly / Monthly | **High:** Central repository of all official decisions. Requires OCR metadata tagging for effective indexing. |
| **UPU & PPU (Detailed & County Plans)** | [split.hr/prostorno-planska-dokumentacija](https://www.split.hr/prostorno-planska-dokumentacija) | PDF / Web GIS | Variable per zone | On-demand per neighborhood | **Medium:** Highly specific to cadastral plots (*katastarske čestice*); requires hybrid search (vector + spatial ID). |

## Regulatory Pain Points Map
| Regulatory Topic | Common Citizen / Tourist Question | Where the Exact Answer Lives | AI-Addressable? (RAG Feasibility) |
|---|---|---|---|
| **Štekati (Terrace & Outdoor Seating)** | "What are the exact dimensional limits and seasonal fees for putting tables outside my cafe in Zona A?" | *Odluka o komunalnom redu*, Pravilnik o zakupu javnih površina | **Yes (High):** AI can instantly extract exact square footage formulas and historical zone boundaries. |
| **Noise & Operating Hours** | "How late can music be played in the old town, and what is the decibel limit before a fine is issued?" | *Odluka o dozvoljenoj razini buke*, Odluka o radnom vremenu ugostiteljstva | **Yes (High):** Standardized threshold numbers can be directly extracted and translated for tourists/bar owners. |
| **Building Permits & Zoning** | "Can I add a solar roof or convert my attic on katastarska čestica 3452 in Meje?" | *GUP Splita (Odredbe za provođenje)*, UPU Meje | **Yes (Medium-High):** Complex multi-step rules can be simplified into conversational step-by-step guidance. |
| **Short-Term Rentals (Airbnbs)** | "What communal fees do I owe the city as a private host, and what waste sorting bins must I provide?" | *Odluka o paušalnom porezu*, Čistoća d.o.o. waste disposal bylaws | **Yes (High):** AI can synthesize tax rules and waste schedules into a single host checklist. |
| **Waste Disposal & Bulky Items** | "Where and on what exact day can I leave bulky waste (*glomazni otpad*) in Žnjan without getting fined?" | Čistoća Split schedules, *Odluka o komunalnom redu* | **Yes (High):** Calendar parsing combined with geolocation makes this a flawless instant AI query. |

## Open Data Inventory
| Dataset Name | Source / Portal | Format | API Availability | Target AI Use Case |
|---|---|---|---|---|
| **City-Owned Commercial Spaces** | [data.gov.hr](https://data.gov.hr) / Grad Split | CSV / JSON | CKAN REST API | AI business advisor for local entrepreneurs seeking municipal rental properties (*gradski poslovni prostori*). |
| **Municipal Expense Transparency** | [split.hr](https://www.split.hr) / iTransparentnost | CSV / Web portal | Web Export / Scrapable | AI watchdog allowing citizens to query exact municipal spending and contractor payments in natural language. |
| **Split Marjan Meteorological Data** | [data.gov.hr](https://data.gov.hr) / DHMZ & MPGI | JSON / XML | CKAN REST API | Correlating weather patterns with seasonal traffic congestion and city heat-island mitigation planning. |
| **Nextbike GBFS Micromobility Feed** | [api.nextbike.net](https://api.nextbike.net) | JSON | Real-time GBFS API | Live multimodal navigation agent routing tourists from crowded bus lines to available e-bikes. |
| **Air Quality & Noise Sensors** | NZJZ SDŽ (County Health Inst.) | Web / Data tables | Web Scraper / API | Real-time health alerts and automated municipal warden dispatching when noise/air pollution thresholds are breached. |

## Implications for Ideation
- **Quick-Win RAG Demos for Hackathon:**
  1. **"Ask GUP" / Permit Navigator:** Ingest the text provisions of GUP Splita. Allow a user to ask "What can I build in zone M1?" and get an instant, perfectly formatted legal breakdown.
  2. **The "Štekat & Red" Advisor:** A multilingual assistant for restaurant owners and tourists that answers exact noise, terrace, and waste rules based on the latest *Odluka o komunalnom redu*.
- **Most-Confused Regulatory Topics:** Spatial planning exceptions and municipal order revisions are the biggest pain points. By grounding the AI in the official *Službeni glasnik* repository, the AI acts as an infallible digital jurist for citizens.
- **Technical Architecture Enabler:** Using hybrid search (BM25 keyword matching for exact act numbers like "66/23" + Vector embeddings for semantic intent) will provide flawless retrieval accuracy during a live demo.

## Sources
- [Grad Split Official Website (split.hr)](https://www.split.hr) — Službeni glasnik, GUP, and municipal gazette archives.
- [National Open Data Portal (data.gov.hr)](https://data.gov.hr) — CKAN API datasets for Split commercial spaces and meteorological data.
- [Ministarstvo prostornoga uređenja, graditeljstva i državne imovine](https://mpgi.gov.hr) — National spatial planning and municipal regulation overviews.
- [Čistoća d.o.o. Split](https://www.cistoca-split.hr) — Communal waste disposal rules and neighborhood collection schedules.
