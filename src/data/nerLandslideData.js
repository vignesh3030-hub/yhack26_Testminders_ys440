export const nerSensorNodes = [
  {
    id: "SN-SKM-01",
    name: "Gangtok NH-10 Km 42 Slope Station",
    state: "Sikkim",
    district: "East Sikkim",
    lat: 27.3389,
    lng: 88.6065,
    elevation: "1,650 m",
    slopeAngle: 42,
    rainfall24h: 185.5, // mm
    rainfallIntensity: 24.2, // mm/hr
    soilMoistureVWC: 91.4, // %
    poreWaterPressure: 52.2, // kPa
    inclinometerDisplacement: 18.8, // mm/day
    fs: 0.88, // Factor of Safety < 1.0 (Critical)
    riskScore: 94,
    riskLevel: "CRITICAL",
    lastUpdated: "Just now",
    status: "ACTIVE_ALARM",
    connectedHighway: "NH-10 (Siliguri - Gangtok Corridor)",
    nearestVillage: "Seti Jhora / Martam"
  },
  {
    id: "SN-MEG-01",
    name: "Sohra-Mawsynram Ridge Sensor Node",
    state: "Meghalaya",
    district: "East Khasi Hills",
    lat: 25.5788,
    lng: 91.8933,
    elevation: "1,490 m",
    slopeAngle: 38,
    rainfall24h: 220.0,
    rainfallIntensity: 28.4,
    soilMoistureVWC: 95.1,
    poreWaterPressure: 61.0,
    inclinometerDisplacement: 22.5,
    fs: 0.82,
    riskScore: 97,
    riskLevel: "CRITICAL",
    lastUpdated: " Just now",
    status: "ACTIVE_ALARM",
    connectedHighway: "NH-206 (Shillong - Sohra Axis)",
    nearestVillage: "Mawsynram & Sohra Gorge"
  },
  {
    id: "SN-ASM-01",
    name: "Haflong Dima Hasao Hill Station",
    state: "Assam",
    district: "Dima Hasao",
    lat: 25.1667,
    lng: 93.0167,
    elevation: "680 m",
    slopeAngle: 34,
    rainfall24h: 142.0,
    rainfallIntensity: 16.5,
    soilMoistureVWC: 84.5,
    poreWaterPressure: 38.1,
    inclinometerDisplacement: 11.2,
    fs: 1.04,
    riskScore: 79,
    riskLevel: "HIGH",
    lastUpdated: "3 mins ago",
    status: "WARNING",
    connectedHighway: "NH-27 (Haflong Corridor)",
    nearestVillage: "Jatinga / Haflong Town"
  },
  {
    id: "SN-MIZ-01",
    name: "Aizawl Laipuitlang Slope Node",
    state: "Mizoram",
    district: "Aizawl",
    lat: 23.7271,
    lng: 92.7176,
    elevation: "1,132 m",
    slopeAngle: 39,
    rainfall24h: 118.0,
    rainfallIntensity: 14.0,
    soilMoistureVWC: 81.0,
    poreWaterPressure: 36.5,
    inclinometerDisplacement: 9.4,
    fs: 1.08,
    riskScore: 75,
    riskLevel: "HIGH",
    lastUpdated: "5 mins ago",
    status: "WARNING",
    connectedHighway: "NH-54 (Aizawl - Lunglei)",
    nearestVillage: "Laipuitlang Ward"
  },
  {
    id: "SN-NAG-01",
    name: "Kohima NH-29 Bypass Station",
    state: "Nagaland",
    district: "Kohima",
    lat: 25.6751,
    lng: 94.1086,
    elevation: "1,444 m",
    slopeAngle: 31,
    rainfall24h: 62.0,
    rainfallIntensity: 7.2,
    soilMoistureVWC: 62.0,
    poreWaterPressure: 18.0,
    inclinometerDisplacement: 3.1,
    fs: 1.48,
    riskScore: 42,
    riskLevel: "MEDIUM",
    lastUpdated: "12 mins ago",
    status: "NORMAL",
    connectedHighway: "NH-29 (Dimapur - Kohima)",
    nearestVillage: "Dzüvötsü Ward"
  },
  {
    id: "SN-MAN-01",
    name: "Jiribam-Imphal NH-37 Tupul Station",
    state: "Manipur",
    district: "Noney",
    lat: 24.8170,
    lng: 93.6400,
    elevation: "820 m",
    slopeAngle: 41,
    rainfall24h: 165.0,
    rainfallIntensity: 21.8,
    soilMoistureVWC: 89.2,
    poreWaterPressure: 48.0,
    inclinometerDisplacement: 16.1,
    fs: 0.91,
    riskScore: 91,
    riskLevel: "CRITICAL",
    lastUpdated: "1 min ago",
    status: "ACTIVE_ALARM",
    connectedHighway: "NH-37 (Imphal - Jiribam Corridor)",
    nearestVillage: "Tupul Railway Settlement"
  },
  {
    id: "SN-ARN-01",
    name: "Itanagar Papum Pare Hill Node",
    state: "Arunachal Pradesh",
    district: "Papum Pare / West Kameng",
    lat: 27.0844,
    lng: 93.6053,
    elevation: "420 m",
    slopeAngle: 33,
    rainfall24h: 88.0,
    rainfallIntensity: 11.5,
    soilMoistureVWC: 68.0,
    poreWaterPressure: 22.0,
    inclinometerDisplacement: 4.8,
    fs: 1.35,
    riskScore: 52,
    riskLevel: "MEDIUM",
    lastUpdated: "8 mins ago",
    status: "NORMAL",
    connectedHighway: "NH-415 (Itanagar Highway)",
    nearestVillage: "Karsingsa & Banderdewa"
  }
];

export const nerHighways = [
  {
    id: "HW-NH10",
    name: "NH-10 Siliguri - Gangtok Highway",
    state: "Sikkim / WB",
    lengthKm: 114,
    criticalSegment: "Km 38 to Km 48 (Seti Jhora / Kalijhora / Melli)",
    riskLevel: "CRITICAL",
    status: "PARTIALLY_BLOCKED",
    advisory: "NDMI Alert: High risk of slope failure & debris flows. Heavy transport suspended. Reroute via Reshi pass.",
    lat: 27.1500,
    lng: 88.4800
  },
  {
    id: "HW-NH37",
    name: "NH-37 Imphal - Jiribam Highway",
    state: "Manipur",
    lengthKm: 220,
    criticalSegment: "Tupul Railway Bridge Approach",
    riskLevel: "CRITICAL",
    status: "HIGH_RISK_ALERT",
    advisory: "NDRF 12th Battalion deployed. Active tension cracks along 2.4km slope shoulder.",
    lat: 24.8170,
    lng: 93.6400
  },
  {
    id: "HW-NH206",
    name: "NH-206 Shillong - Sohra Road",
    state: "Meghalaya",
    lengthKm: 54,
    criticalSegment: "Mylliem to Sohra Gorge Pass",
    riskLevel: "HIGH",
    status: "CAUTION",
    advisory: "Torrential downpour (220mm/24h) causing rockfall & mudslides near Elephant Falls.",
    lat: 25.4200,
    lng: 91.8200
  },
  {
    id: "HW-NH27",
    name: "NH-27 Guwahati - Haflong - Silchar Corridor",
    state: "Assam",
    lengthKm: 310,
    criticalSegment: "Jatinga Valley Subsidence Zone",
    riskLevel: "HIGH",
    status: "CAUTION",
    advisory: "ASDMA Report: Single-lane traffic due to railway embankment slope displacement.",
    lat: 25.1667,
    lng: 93.0167
  },
  {
    id: "HW-NH29",
    name: "NH-29 Dimapur - Kohima Highway",
    state: "Nagaland",
    lengthKm: 74,
    criticalSegment: "Phesama Landslide Corridor",
    riskLevel: "MEDIUM",
    status: "OPEN",
    advisory: "Continuous IoT inclinometer monitoring active. Traffic moving with caution.",
    lat: 25.6400,
    lng: 94.1000
  }
];

export const nerVillages = [
  {
    id: "VIL-01",
    name: "Martam & Seti Jhora Hamlets",
    state: "Sikkim",
    district: "East Sikkim",
    population: 4200,
    riskLevel: "CRITICAL",
    threatReason: "NDMI Report: Soil saturation 91.4% with antecedent rain 185.5mm in 24h",
    evacuationStatus: "RECOMMENDED",
    designatedShelter: "Gangtok Indoor Sports Complex",
    lat: 27.2800,
    lng: 88.5800
  },
  {
    id: "VIL-02",
    name: "Tupul Railway Settlement",
    state: "Manipur",
    district: "Noney",
    population: 1850,
    riskLevel: "CRITICAL",
    threatReason: "NDRF Log: Pore water pressure exceeds shear strength (Fs = 0.91)",
    evacuationStatus: "MANDATORY_IN_PROGRESS",
    designatedShelter: "Noney High School Relief Center",
    lat: 24.8100,
    lng: 93.6300
  },
  {
    id: "VIL-03",
    name: "Mawsynram & Sohra Valley",
    state: "Meghalaya",
    district: "East Khasi Hills",
    population: 2800,
    riskLevel: "CRITICAL",
    threatReason: "Extreme precipitation (220mm/24h) causing rockfall & rapid erosion",
    evacuationStatus: "RECOMMENDED",
    designatedShelter: "Shillong Civil Defense Shelter",
    lat: 25.3000,
    lng: 91.5800
  },
  {
    id: "VIL-04",
    name: "Laipuitlang Hill Settlement",
    state: "Mizoram",
    district: "Aizawl",
    population: 3400,
    riskLevel: "HIGH",
    threatReason: "Steep 39° sandstone slope cut base + heavy rainfall accumulation",
    evacuationStatus: "ADVISORY_ISSUED",
    designatedShelter: "Aizawl Multipurpose Relief Center",
    lat: 23.7300,
    lng: 92.7200
  },
  {
    id: "VIL-05",
    name: "Jatinga & Dhemaji Flood Hamlets",
    state: "Assam",
    district: "Dima Hasao / Dhemaji",
    population: 21071,
    riskLevel: "HIGH",
    threatReason: "ASDMA Log: 1.2M people affected across 23 districts, 118 relief camps hosting evacuees",
    evacuationStatus: "ADVISORY_ISSUED",
    designatedShelter: "Haflong Community Hall Shelter",
    lat: 25.1500,
    lng: 93.0300
  }
];

export const nerShelters = [
  {
    id: "SHL-01",
    name: "Gangtok Indoor Sports Complex Shelter",
    state: "Sikkim",
    location: "Paljor Stadium Road, Gangtok",
    capacity: 800,
    occupied: 345,
    medicalStaff: "4 Doctors, 8 Nurses",
    suppliesStatus: "ADEQUATE",
    contactPerson: "Disaster Cell Sikkim (+91-3592-202688)",
    lat: 27.3300,
    lng: 88.6100
  },
  {
    id: "SHL-02",
    name: "Shillong Civil Defense Relief Center",
    state: "Meghalaya",
    location: "Laitumkhrah, Shillong",
    capacity: 1200,
    occupied: 580,
    medicalStaff: "6 Doctors, 12 Nurses",
    suppliesStatus: "ADEQUATE",
    contactPerson: "SDMA Meghalaya (+91-364-2502094)",
    lat: 25.5700,
    lng: 91.8800
  },
  {
    id: "SHL-03",
    name: "Noney High School Relief Center",
    state: "Manipur",
    location: "Noney Market Ridge, Manipur",
    capacity: 500,
    occupied: 390,
    medicalStaff: "2 Doctors, 4 Nurses",
    suppliesStatus: "CRITICAL_REFILL_NEEDED",
    contactPerson: "NDRF 12th Battalion Dispatch",
    lat: 24.8200,
    lng: 93.6500
  },
  {
    id: "SHL-04",
    name: "Haflong Community Relief Hall",
    state: "Assam",
    location: "Haflong Town Center, Dima Hasao",
    capacity: 650,
    occupied: 420,
    medicalStaff: "3 Doctors, 5 Nurses",
    suppliesStatus: "ADEQUATE",
    contactPerson: "ASDMA Haflong (+91-3673-236324)",
    lat: 25.1700,
    lng: 93.0200
  }
];

export const nerHistoricalRecords = [
  {
    id: "HIS-2020-ASDMA-MEG",
    event: "September 2020 Meghalaya & Assam Monsoon Landslides",
    date: "September 2020",
    location: "Garo Hills & East Khasi Hills, Meghalaya / Assam",
    casualties: 13,
    impact: "240,000 people affected across 12 flooded districts, 5 missing in landslides.",
    cause: "NDMI Report: Incessant rain from upstream Nepal & Brahmaputra surge (240mm/48h)"
  },
  {
    id: "HIS-2020-IDUKKI",
    event: "August 2020 Pettimudi Idukki Tea Estate Landslide",
    date: "August 2020",
    location: "Pettimudi, Rajamala, Idukki District",
    casualties: 70,
    impact: "Massive mudslide buried 30 tea plantation quarters; 508,000 evacuated across state.",
    cause: "ECHO Report: Monsoon downpour (310mm/24h) triggered overburden collapse on 42° slope"
  },
  {
    id: "HIS-2020-ASDMA-JUL",
    event: "July 2020 Assam ASDMA Great Monsoon Surge",
    date: "July 2020",
    location: "Barpeta, Dhemaji & Goalpara, Assam",
    casualties: 136,
    impact: "5.6 million people affected across 26 districts, 127,647 ha cropland submerged, 47,213 in 286 relief camps.",
    cause: "ASDMA Report: 110 flood breaches and 26 severe slope failures"
  },
  {
    id: "HIS-2020-ARN",
    event: "June 2020 Arunachal Pradesh Slope Failures",
    date: "June 2020",
    location: "West Kameng & Papum Pare, Arunachal Pradesh",
    casualties: 8,
    impact: "Destroyed 5,000 houses, cut off Itanagar highway corridor for 10 days.",
    cause: "Torrential monsoon rainfall on fragile Himalayan phyllite slope"
  },
  {
    id: "HIS-2023-SKM",
    event: "October 2023 Teesta River GLOF & NH-10 Slip",
    date: "October 2023",
    location: "Chungthang & Seti Jhora, Sikkim",
    casualties: 42,
    impact: "Destroyed 32km of NH-10 road pavement, isolated Gangtok for 14 days.",
    cause: "GLOF + Antecedent Rain (210mm in 24h)"
  },
  {
    id: "HIS-2022-MNP",
    event: "June 2022 Noney Railway Construction Landslide",
    date: "June 2022",
    location: "Tupul Railway Yard, Manipur",
    casualties: 61,
    impact: "Debris flow buried railway camp & Ijei river channel (Fs dropped to 0.72).",
    cause: "Unplanned slope cut + saturated shale formation"
  }
];
