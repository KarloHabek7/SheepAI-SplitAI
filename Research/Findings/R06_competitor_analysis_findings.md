# R06: EU Smart City Benchmarks & Competitor Solutions — Findings

> **Executed:** 2026-05-16T10:50:30+02:00
> **Time Spent:** 15 min
> **Agent Model:** Gemini 3 Flash

## Executive Summary
- **State of the Art in AI Municipal Services:** Leading European and global smart cities have transitioned from siloed, reactive municipal apps to unified, AI-driven horizontal platforms. Advanced cities utilize edge computer vision for real-time crowd and infrastructure monitoring, multi-lingual generative AI virtual assistants for 24/7 citizen and tourist support, and big data predictive analytics to manage urban density and dispatch city services before issues escalate.
- **3 Standard Features Missing from Split:** 
  1. *Real-time multimodal issue classification:* Automated AI categorization and urgency scoring of citizen photo reports (vs. manual ticketing queues in Gradsko oko).
  2. *Multilingual conversational municipal RAG:* 24/7 instant AI inquiry resolution across dozens of languages for tourists and expats (vs. static PDFs and fragmented web portals).
  3. *Proactive crowd density forecasting & management:* Real-time computer vision headcount and traffic-light load indicators at historic bottlenecks (as seen in Dubrovnik and Venice).
- **Biggest Unique Gap Opportunity:** No Mediterranean city has successfully unified **multilingual tourist assistance, citizen issue reporting via Computer Vision, and real-time municipal open data RAG into a single "Civic Super-Agent."** Most cities maintain separate systems for IoT/crowds (e.g., Venice Control Room), citizen democracy (e.g., Barcelona Decidim), and chatbots (e.g., Helsinki Hester). SplitAI can bridge this gap by acting as a unified multimodal AI interface for all stakeholders.

## Competitor Matrix

| City | Solution | What It Does | Tech Stack | Strengths | Weaknesses | Split Applicability |
|---|---|---|---|---|---|---|
| **Dubrovnik** | *Respect the City (Poštujmo Grad)* & *Dubrovnik Pass* | Real-time Old Town gate crowd monitoring, traffic-light capacity pacing, digital attraction ticketing | Computer vision gate sensors, predictive ML models, IoT parking sensors | Highly effective crowd flattening; strong synergy with cruise ship schedules | Lacks automated natural language AI guidance for visitors on the ground | **High** (Old Town Split faces identical congestion and UNESCO constraints) |
| **Venice** | *Smart Control Room (Tronchetto)* | Centralized urban intelligence tracking tourist flows, transit occupancy, and day-tripper QR fee validation | 3D optical pedestrian sensors, mobile radio sniffers, AI video analytics | Comprehensive city-wide visibility and privacy-compliant tracking | High infrastructure cost; closed data silo mostly accessible only to city officials | **Medium** (Excellent model for Peristil/Riva crowd management) |
| **Barcelona** | *Sentilo* & *Decidim* | Open-source IoT data exchange layer and participatory citizen democracy platform | Ruby on Rails, Node.js, horizontal IoT sensor network | High data sovereignty, open-source community, breaks down municipal department silos | Limited AI integration in core civic engagement workflows | **High** (Sentilo's horizontal data model is perfect for unifying Split's fragmented utilities) |
| **Helsinki** | *Hester* & *AI Register* | Multilingual 24/7 virtual assistant for municipal/health services with public transparency registry | IBM watsonx Assistant, LLM translation pipelines | Exceptional transparency (AI Register details every model's data use and human oversight) | Fragmented across multiple specialized chatbots rather than a true unified super-app | **High** (AI Register establishes immediate civic trust and EU AI Act compliance) |
| **Seoul** | *120 Dasan Call Center* | Multi-channel AI civil complaint processing, real-time multilingual counseling, big data urban analysis | AI Counseling Assistant, CLOVA CareCall, speech-to-text IVR | Drastically reduces call queue times; automated filtering of malicious/abusive complaints | Complex integration with massive backend legacy databases | **High** (Demonstrates how AI can triage and summarize citizen complaints for city workers) |

## Feature Landscape Map

| Feature | Available In | Missing From Split | Difficulty to Build | Demo Impact |
|---|---|---|---|---|
| **Multilingual Conversational RAG** | Helsinki, Seoul | ✅ Missing | Medium | Very High |
| **Computer Vision Issue Classification** | Global automated maintenance pilots | ✅ Missing | Low (with Gemini Multimodal) | Very High |
| **Real-Time Gate Crowd Monitoring** | Dubrovnik, Venice | ✅ Missing | Medium | High |
| **Open AI Governance / Transparency Register** | Helsinki | ✅ Missing | Low (Documentation) | Medium (High judge appeal) |
| **Horizontal IoT & Open Data Integration** | Barcelona (Sentilo) | ✅ Missing | High | High |

## Gap Opportunities
- **Unified Multimodal UX:** Existing solutions force users to download one app for issue reporting (Dubrovnik Eye / Gradsko oko) and use a separate site for visitor info. A unified assistant that handles both via text/voice/photo is a massive market differentiator.
- **Vision-Powered Civic Maintenance:** Combining Gemini 2.5 Vision with geotagged user submissions to instantly extract issue type, severity, exact location, and even draft the municipal repair work order.
- **Transparent AI Registry for EU Cities:** Including an explicit "AI Transparency Shield" within the app that shows citizens exactly how their data and AI decisions are routed, setting a benchmark for EU Smart Cities.

## Implications for Ideation
- **Table Stakes:** SplitAI must include seamless multilingual support and instantaneous access to municipal service schedules (parking, transit, waste collection).
- **Standout Differentiator:** We should focus on the intersection of **Vision AI + RAG**. For example, a citizen snaps a photo of an overflowing communal bin or graffiti on a historic facade; SplitAI instantly classifies it, checks local GUP/komunalni red regulations via RAG, notifies the exact municipal department (npr. Čistoća Split), and updates the public city map in real time.
- **Architectural North Star:** Design a modular system where SplitAI acts as an intelligent orchestration layer on top of existing services (Gradsko oko, Split Parking), ensuring realistic feasibility for city integration.

## Sources
- [Dubrovnik Respect the City & Smart Tourism](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFtvr_19cIgZi9zw3DP2njFL1XNp9JcP7nSHuT4CbaJIWGG05cyWuOB_QcDng37YhwCsJvLEP-GyW8mxswoYfIWYv0lEi8cRpVkHDRdhteh3YB4YEfEG24byHcEg2i9zi41W9voUl0sEeCXcV6B7Zg4BFWNWxTWzqWxIAaMoCIWcss7)
- [Venice Smart Control Room Architecture](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEIlzE3SXfhyFGi_HISFTo0TLiyo7zcz0NH2eD0K4ytthgl1MB3MMfGBk-5sNM9xcoT6s4l7AbpBFSDGlhXusacoowpmtU9Is4xmEd3yyOLrIbD4H-Cnc_vI-PV_aBQrjxyQVMKnCPKPHRwfdEoecTR4epj6k0aV_s-oCr5CQ==)
- [Barcelona Sentilo IoT & Decidim Platforms](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFomp95YH6QFQ6AChuOZ3b9AdQf3xmNAb29yCX9302_Ss-YmVSuBJwg6KLe9aFVlm7H0ixU_63pljm3hqRPgFqiCcuk6_KYqXOP2zH3y6CLk_qcC7VK_8QWZoLRt-gwSApdxCn1b1GV4LB-ZPg0Zsl5bi2RBg0qq2n2CGmS4cIc)
- [Helsinki Hester AI Chatbot & AI Register](https://ai.hel.fi/en/ai-register/)
- [Seoul 120 Dasan Call Center AI Integration](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_eEOmz51SiVif6o7yJ9_TNQgEROJV45rA_TnkuFxt8Xg-AFka4OK7cXsrK_AgxiX_9N_eE09qm09hAZAkmgifWXH648GUv2w1IIzj-KoBuYvzFgXdsAOZsQ8Qh_IATx-0QZP9gX5s1cZ3gfU4GlGRkh6NCxesMff3WTilB60vEfkGlgXlFvddWcWQPr5R6BLiIF54hidauGhi5UrdI3-X1JVLdgo6-t7yL6LuLvx_iNI0WHX91U2bx4LFRCl81AaTx7JfKFNx9GkVLUpAkElgH1q8ig==)
