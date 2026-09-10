/**
 * AI-Powered Landslide Risk Prediction Engine
 * Integrates geotechnical physics (Infinite Slope Model) with Machine Learning
 * Landslide Susceptibility Index (LSI) proxy.
 */

export function calculateLandslideRisk({
  rainfall24h = 50,       // mm in last 24h
  soilMoistureVWC = 60,   // Soil moisture volumetric water content %
  slopeAngle = 35,        // Slope gradient in degrees
  slopeCutAngle = 0,      // Additional unplanned human slope cut in degrees
  deforestationPct = 20,  // Deforestation / vegetation loss %
  cohesion = 15,          // Effective cohesion c' (kPa)
  frictionAngle = 28,     // Internal friction angle phi' (degrees)
  soilDepth = 3.5         // Depth to potential sliding plane z (m)
}) {
  // Convert angles to radians
  const totalSlopeDeg = Math.min(65, slopeAngle + slopeCutAngle * 0.7);
  const thetaRad = (totalSlopeDeg * Math.PI) / 180;
  const phiRad = (frictionAngle * Math.PI) / 180;

  // Constants
  const gammaSoil = 18.5; // kN/m^3 (wet unit weight of slope material)
  const gammaWater = 9.81; // kN/m^3 (unit weight of water)

  // Calculate saturated water head (hw) from rainfall & soil moisture
  // Higher antecedent rainfall and soil moisture increase pore water pressure
  const satRatio = Math.min(1.0, (soilMoistureVWC / 100) * 0.7 + (rainfall24h / 200) * 0.5);
  const hw = Math.min(soilDepth, soilDepth * satRatio);

  // Pore water pressure (u) at failure surface in kPa
  const porePressure = hw * gammaWater;

  // Effective normal stress sigma' = (gamma * z - gamma_w * hw) * cos^2(theta)
  const totalWeight = gammaSoil * soilDepth;
  const effectiveStress = Math.max(0, (totalWeight - porePressure)) * Math.pow(Math.cos(thetaRad), 2);

  // Shear strength tau = c' + sigma' * tan(phi')
  // Root cohesion bonus (decreased by deforestation)
  const rootCohesionBonus = Math.max(0, 5 * (1 - deforestationPct / 100));
  const totalCohesion = cohesion + rootCohesionBonus;
  
  const resistingShear = totalCohesion + effectiveStress * Math.tan(phiRad);

  // Driving shear stress tau_d = gamma * z * sin(theta) * cos(theta)
  const drivingShear = totalWeight * Math.sin(thetaRad) * Math.cos(thetaRad);

  // Factor of Safety (Fs) = Resisting Shear / Driving Shear
  let fs = drivingShear > 0.001 ? resistingShear / drivingShear : 3.0;
  fs = Math.max(0.2, Math.min(3.5, Number(fs.toFixed(2))));

  // Machine Learning Risk Score (LSI) Calculation (0 to 100%)
  const wRain = Math.min(40, (rainfall24h / 180) * 40);
  const wSoil = Math.min(30, (soilMoistureVWC / 95) * 30);
  const wSlope = Math.min(20, (totalSlopeDeg / 55) * 20);
  const wDeforest = Math.min(10, (deforestationPct / 100) * 10);

  let rawRisk = wRain + wSoil + wSlope + wDeforest;

  // Non-linear acceleration when Fs drops below 1.2
  if (fs < 1.0) {
    rawRisk = Math.max(rawRisk, 88 + (1.0 - fs) * 20);
  } else if (fs < 1.25) {
    rawRisk = Math.max(rawRisk, 65 + (1.25 - fs) * 60);
  }

  const riskScore = Math.min(99, Math.max(5, Math.round(rawRisk)));

  // Risk Classification
  let riskLevel = "LOW";
  let color = "#10B981"; // Emerald green
  let timeToFailure = "Stable / No Immediate Failure Risk";
  let recommendations = [];

  if (riskScore >= 80 || fs < 1.05) {
    riskLevel = "CRITICAL";
    color = "#EF4444"; // Red
    timeToFailure = "0.5 to 3.0 Hours (Imminent Failure Threat)";
    recommendations = [
      "Issue immediate RED ALERT evacuation notice for downhill hamlets and settlements.",
      "Close highway segment immediately to all vehicular and pedestrian traffic.",
      "Deploy NDRF/SDRF emergency search & rescue teams to high-risk perimeter.",
      "Activate emergency siren and broadcast SMS warnings to registered local residents."
    ];
  } else if (riskScore >= 55 || fs < 1.30) {
    riskLevel = "HIGH";
    color = "#F97316"; // Orange
    timeToFailure = "6 to 18 Hours (High Failure Risk if Rainfall Continues)";
    recommendations = [
      "Issue ORANGE WATCH advisory for vulnerable roadside communities.",
      "Restrict heavy goods vehicles (HGVs) and night travel along highway corridor.",
      "Pre-station emergency machinery (excavators, earthmovers) at critical chokepoints.",
      "Increase IoT sensor polling frequency from 15 mins to 1 min live stream."
    ];
  } else if (riskScore >= 35 || fs < 1.60) {
    riskLevel = "MEDIUM";
    color = "#EAB308"; // Yellow
    timeToFailure = "24+ Hours (Moderate Monitoring Required)";
    recommendations = [
      "Maintain YELLOW ADVISORY status for local disaster management cells.",
      "Inspect slope drainage channels and clear blockage debris.",
      "Monitor weather radar for approaching high-intensity storm cells."
    ];
  } else {
    riskLevel = "LOW";
    color = "#10B981";
    recommendations = [
      "Normal conditions. Continuous IoT telemetry active.",
      "Routine slope visual inspection scheduled."
    ];
  }

  return {
    fs,
    riskScore,
    riskLevel,
    color,
    timeToFailure,
    porePressure: Math.round(porePressure),
    effectiveStress: Math.round(effectiveStress),
    drivingShear: Number(drivingShear.toFixed(1)),
    resistingShear: Number(resistingShear.toFixed(1)),
    recommendations,
    timestamp: new Date().toLocaleTimeString()
  };
}
