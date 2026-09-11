# 🌋 AIMS - AI-Powered Landslide Early Warning & Disaster Management System

> **Multi-Hazard Geotechnical Monitoring, Real-Time IMD Weather Integration, NITI Aayog ICED Climate Risk Analytics & AI "What-If" Physics Simulator for High-Risk Mountain Sectors (North Eastern Region & Tamil Nadu)**

---

## 📌 Executive Overview

**AIMS (AI-Powered Landslide Monitoring & Disaster System)** is an enterprise-grade, real-time disaster early warning and geotechnical risk monitoring platform. Engineered for emergency commanders, State Disaster Management Authorities (SDMA), and field responders, AIMS combines **sensor telemetry (IoT piezometers, inclinometers, VWC soil saturation probes)** with **limit equilibrium physics algorithms**, **machine learning predictive modeling**, **live IMD Mausam weather telemetry**, and **NITI Aayog ICED 3.0 energy grid vulnerability data** to forecast slope instability, flash flooding, and debris flows before catastrophe strikes.

AIMS provides targeted regional coverage across two of India's most landslide-vulnerable topographies:
1. **North Eastern Region (NER)**: Sikkim, Meghalaya, Assam, Mizoram, Nagaland, Manipur, and Arunachal Pradesh.
2. **Tamil Nadu High-Risk Mountain Sectors**: The Nilgiris District, Coimbatore (Valparai & Mettupalayam Ghats), Dindigul (Palani Hills / Kodaikanal), and Salem (Yercaud Hills).

---

## ✨ Key Features & System Capabilities

### 🛰️ 1. Interactive Multi-Layer GIS Map & Regional Zoom
- **Leaflet & OpenStreetMap Integration**: High-resolution interactive GIS map with real-time risk heatmaps, IoT slope sensor stations, vulnerable highway corridors, mountain villages, relief shelters, and geo-tagged field hazard reports.
- **Sector Quick Zoom Controls**: Instant sector focus switching between **All India View**, **Tamil Nadu Sector** (Nilgiris / Valparai / Tiruvannamalai), and **North Eastern Region Sector** (Gangtok / Sohra / Haflong).
- **Multi-Lingual Popups & Modals**: Dynamic map popups and station telemetry modals automatically translate into the active language selected by the user.

### 🌤️ 2. Live IMD Mausam & Satellite Weather Telemetry
- **India Meteorological Department (IMD) Integration**: Real-time fetching and fallback simulation of IMD live weather bulletins, district heavy-rainfall warnings, and atmospheric pressure gradients.
- **AI Satellite Radar Monitor (Sentinel-1 SAR & INSAT-3DR)**: Synthetic Aperture Radar (SAR) ground displacement detection, cloud top temperature anomaly mapping, and micro-burst precipitation detection (`src/utils/satelliteWeatherAi.js`).

### ⚡ 3. NITI Aayog ICED 3.0 Infrastructure Climate Risk Monitor
- **Energy Infrastructure Vulnerability**: Real-time integration of NITI Aayog's India Climate & Energy Dashboard (ICED 3.0) metrics (`src/utils/nitiAayogIcedBackend.js`).
- **Power Grid & Substation Risk Exposure**: Tracks high-tension lines, hydroelectric dam reservoirs, and transmission towers in landslide-prone terrain.

### 🤖 4. Physics & AI "What-If" Slope Hazard Simulator
- **Live Factor of Safety ($F_s$) Engine**: Computes slope stability using Mohr-Coulomb shear strength criteria and pore water pressure equations (`src/utils/aiPredictorEngine.js`):
  $$F_s = \frac{c' + (\sigma - u) \tan \phi'}{\tau_d}$$
- **Interactive Parameter Sliders**: Adjust 24h rainfall intensity (0–250+ mm), soil moisture saturation (VWC %), slope cut angles (+0–25°), and vegetation loss.
- **Historic Disaster Preset Action Chips**: One-click quick loading of real-world disaster parameters:
  - 🌋 `1978 Nilgiris (323mm)` — Unprecedented 24h cloudburst downpour
  - 💥 `1990 Geddhai (210mm)` — TANGEDCO residential camp boulder flow
  - 🌊 `2009 Mass Slip (315mm)` — 1,150 simultaneous landslide events
  - 🌀 `2024 Tiruvannamalai (295mm)` — Cyclone Fengal hillock destabilization
  - ☕ `2020 Idukki (310mm)` — Pettimudi tea plantation slope failure
  - 🌊 `2020 Assam Surge` — ASDMA Brahmaputra basin deluge

### 📚 5. Historical Disaster Case Intelligence Library
- **21 Cataloged Landmark Disasters**: Deep forensic repository covering:
  - **5 Landmark Tamil Nadu Cases**: Detailed historical logs of the 1978 Nilgiris flash floods, 1990 Geddhai avalanche, 2009 mass landslides, 2018 Western Ghats monsoonal slope failures, and 2024 Tiruvannamalai Cyclone Fengal mudslides.
  - **16 ECHO & OCHA 2020 Southwest Monsoon Bulletins**: Comprehensive national disaster timeline covering Assam, Bihar, Idukki Kerala, West Bengal, Telangana/Hyderabad flood catastrophe (INR 550 Crore relief allocation), Odisha, MP, Gujarat, and Meghalaya.
- **Tamil Nadu SDMA High-Risk Vulnerable Zones**: Geological profiles, primary meteorological triggers, historical incident counts, and monitoring protocols for *The Nilgiris*, *Coimbatore*, *Dindigul*, and *Salem*.
- **"Simulate in AI Engine" Action**: Directly populates historical parameters into the What-If Simulator for comparative risk analysis.

### 🌐 6. Multi-Lingual Internationalization (i18n)
- Seamless live switching across **7 native languages**:
  - 🇬🇧 **English**
  - 🇮🇳 **தமிழ் (Tamil)**
  - 🇮🇳 **हिन्दी (Hindi)**
  - 🇮🇳 **অসমীয়া (Assamese)**
  - 🇮🇳 **বাংলা (Bengali)**
  - 🇳🇵 **नेपाली (Nepali)**
  - 🇮🇳 **Mizo (Mizo ṭawng)**

### 📡 7. Offline Field Hazard Reporting & Queue Syncing
- Resilient offline field hazard reporting using `LocalStorage` & `ServiceWorker` queuing.
- Captures hazard types (active slope tension cracks, rockfalls, mudslides, road subsidence) with photo evidence and GPS coordinates. Automatically syncs reports when internet connection is restored.

### 🚨 8. Early Warning & Multi-Channel Emergency Dispatch
- Multi-tier alert counter system (Level I Normal to Level IV Critical).
- Emergency broadcast center delivering alerts via SMS, WhatsApp, Regional Sirens, and Emergency Radio.
- Response priority scoring and NDRF/SDRF rescue team deployment dispatcher.

### 📑 9. Printable Situation Reports (SitRep PDF Export)
- One-click exportable official Situation Report (SitRep) modal formatted for emergency command meetings, press briefings, and NDMA archiving.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|---|---|---|
| **Core Framework** | React 18 + Vite 5 | Fast component rendering & HMR build toolchain |
| **Styling** | Tailwind CSS + Vanilla CSS | Modern dark-mode aesthetic with glassmorphism & subtle gradients |
| **Icons** | Lucide React | High-contrast vector icon system |
| **GIS Mapping** | Leaflet + React-Leaflet | Open-source interactive map rendering |
| **Data Viz** | Recharts | Dynamic telemetry & rainfall trend charts |
| **State Management** | React Context API | `DisasterDataContext` & `LanguageContext` |
| **Weather & Climate APIs** | Open-Meteo & IMD Mausam | Real-time weather monitoring & monsoon bulletins |
| **Climate Infrastructure** | NITI Aayog ICED 3.0 API | Energy grid and climate vulnerability metrics |

---

## 📂 Project Directory Structure

```
kpr-hackathon/
├── public/
│   ├── favicon.ico
│   ├── region_map.png
│   ├── rockfall.png
│   └── tension_crack.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AIModel/
│   │   │   ├── AISatelliteMonitorCard.jsx # Sentinel-1 SAR & INSAT-3DR satellite monitor
│   │   │   ├── NITIAayogICEDCard.jsx     # NITI Aayog ICED 3.0 climate risk card
│   │   │   └── WhatIfSimulator.jsx       # AI Physics & Historic preset simulator
│   │   ├── Alerts/
│   │   │   ├── BroadcastModal.jsx        # Multi-channel emergency broadcast modal
│   │   │   └── EarlyWarningCenter.jsx    # Alert feed & early warning dashboard
│   │   ├── Common/
│   │   │   ├── IMDMausamCard.jsx         # Live IMD weather bulletin feed card
│   │   │   └── SituationReportModal.jsx  # Printable SitRep report exporter
│   │   ├── Dashboard/
│   │   │   ├── AnalyticsCharts.jsx       # Recharts telemetry graphs
│   │   │   ├── DisasterOverview.jsx      # High-level regional statistics
│   │   │   ├── HistoricalCasesView.jsx   # Historical disaster intelligence & TN zones
│   │   │   └── SensorTelemetry.jsx       # Sensor node data grid
│   │   ├── FieldReports/
│   │   │   ├── ReportFeed.jsx            # Geo-tagged hazard submission feed
│   │   │   └── ReportSubmissionModal.jsx # Offline-capable report submit form
│   │   ├── GISMap/
│   │   │   ├── FeatureDetailsModal.jsx   # Multi-lingual feature inspector modal
│   │   │   ├── MapControls.jsx           # Layer toggles & Sector zoom controls
│   │   │   └── RiskMap.jsx               # Main Leaflet map with smooth panning
│   │   ├── Response/
│   │   │   ├── EmergencyResponse.jsx     # NDRF/SDRF deployment panel
│   │   │   └── ShelterTracker.jsx        # Evacuation shelter capacity tracker
│   │   ├── DashboardLayout.jsx           # Main dashboard layout container
│   │   ├── DetailReportModal.jsx         # Detailed slope report view
│   │   ├── HeaderBar.jsx                 # Language selector & location bar
│   │   ├── Navbar.jsx                    # Top bar controls
│   │   ├── RiskTierCounterBar.jsx        # 4-tier risk status counters
│   │   └── Sidebar.jsx                   # Sticky locked sidebar navigation
│   ├── context/
│   │   ├── DisasterDataContext.jsx       # Global disaster & simulator state
│   │   └── LanguageContext.jsx           # Multi-lingual i18n provider
│   ├── data/
│   │   ├── nerLandslideData.js           # Comprehensive sensor, historical & TN data
│   │   └── translations.js               # 6-language translation dictionaries
│   ├── utils/
│   │   ├── aiPredictorEngine.js          # Physics Fs calculation engine
│   │   ├── alertSound.js                 # Web Audio API emergency sirens
│   │   ├── imdMausamBackend.js           # IMD Mausam API & monsoon bulletin service
│   │   ├── nitiAayogIcedBackend.js       # NITI Aayog ICED 3.0 API service
│   │   ├── offlineStorage.js             # LocalStorage offline report queue
│   │   ├── satelliteWeatherAi.js         # Sentinel-1 SAR & INSAT satellite AI detector
│   │   └── weatherApi.js                 # Open-Meteo & live weather API integration
│   ├── App.css
│   ├── App.jsx                           # Application routing & layout
│   ├── index.css                         # Tailwind CSS directives
│   └── main.jsx                          # React entry point
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vignesh3030-hub/yhack26_Testminders_ys440.git
   cd yhack26_Testminders_ys440
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```
   Output artifacts will be compiled into the `dist/` directory.

---

## 🔬 Geotechnical Physics & Risk Calculation Engine

The core predictive engine computes the **Factor of Safety ($F_s$)** and **Failure Probability** in `src/utils/aiPredictorEngine.js`:

```javascript
// Effective cohesion (kPa) adjusted for soil saturation
const effectiveCohesion = baseCohesion * (1 - soilMoistureVWC / 100);

// Pore water pressure (kPa) based on rainfall & saturation
const poreWaterPressure = (rainfall24h * 0.25) + (soilMoistureVWC * 0.45);

// Resisting shear strength (kPa)
const resistingShear = effectiveCohesion + (normalStress - poreWaterPressure) * Math.tan(frictionAngleRad);

// Driving shear stress (kPa)
const drivingShear = normalStress * Math.sin(slopeRad);

// Safety Factor (Fs < 1.0 indicates slope failure)
const fs = resistingShear / drivingShear;
```

---

## 📜 Compliance & Disaster Management Standards

AIMS is designed in alignment with national disaster protocols:
- **National Disaster Management Authority (NDMA)** guidelines for Landslide Risk Management.
- **Landslide Atlas of India** (ISRO / NRSC) vulnerability mapping standards.
- **India Meteorological Department (IMD)** Mausam alert criteria.
- **NITI Aayog ICED 3.0** Climate & Energy Risk Framework.
- **Assam State Disaster Management Authority (ASDMA)** & **Tamil Nadu State Disaster Management Authority (TNSDMA)** reporting formats.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
 drivingShear = normalStress * Math.sin(slopeRad);

// Safety Factor (Fs < 1.0 indicates slope failure)
const fs = resistingShear / drivingShear;
```

---

## 📜 Compliance & Disaster Management Standards

AIMS is designed in alignment with national disaster protocols:
- **National Disaster Management Authority (NDMA)** guidelines for Landslide Risk Management.
- **Landslide Atlas of India** (ISRO / NRSC) vulnerability mapping standards.
- **Assam State Disaster Management Authority (ASDMA)** & **Tamil Nadu State Disaster Management Authority (TNSDMA)** reporting formats.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
