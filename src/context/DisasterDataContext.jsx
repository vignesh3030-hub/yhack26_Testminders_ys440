import React, { createContext, useContext, useState, useEffect } from "react";
import {
  nerSensorNodes,
  nerHighways,
  nerVillages,
  nerShelters,
  nerHistoricalRecords
} from "../data/nerLandslideData";
import { calculateLandslideRisk } from "../utils/aiPredictorEngine";
import { getOfflineReports, saveReportOffline, markReportsSynced, clearOfflineReports } from "../utils/offlineStorage";
import { analyzeSatelliteWeatherRisk, fetchLiveSatelliteAiFeed } from "../utils/satelliteWeatherAi";

const DisasterDataContext = createContext();

const initialFieldReports = [
  {
    id: "REP-101",
    author: "Field Officer T. Dorjee (Sikkim Civil Defense)",
    hazardType: "Tension Crack",
    locationName: "NH-10 Km 42 Slope Crest (Gangtok Axis)",
    lat: 27.3389,
    lng: 88.6065,
    severity: "CRITICAL",
    description: "New 12cm continuous tension crack detected along upper slope shoulder after 140mm rainfall.",
    photoUrl: "/tension_crack.png",
    status: "VERIFIED",
    timestamp: "25 mins ago",
    synced: true
  },
  {
    id: "REP-102",
    author: "Village Headman L. Mawi (Sohra Ridge)",
    hazardType: "Rockfall",
    locationName: "Mylliem - Sohra Pass (NH-206)",
    lat: 25.5788,
    lng: 91.8933,
    severity: "HIGH",
    description: "Intermittent boulders falling across left lane. Mud seepage visible.",
    photoUrl: "/rockfall.png",
    status: "VERIFIED",
    timestamp: "1 hour ago",
    synced: true
  }
];

export const DisasterDataProvider = ({ children }) => {
  const [sensors, setSensors] = useState(nerSensorNodes);
  const [highways, setHighways] = useState(nerHighways);
  const [villages, setVillages] = useState(nerVillages);
  const [shelters, setShelters] = useState(nerShelters);
  const [fieldReports, setFieldReports] = useState(initialFieldReports);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingOfflineCount, setPendingOfflineCount] = useState(0);
  const [unitsDeployed, setUnitsDeployed] = useState(14);
  const [showSitRepModal, setShowSitRepModal] = useState(false);

  // Satellite AI Weather State
  const [selectedSatelliteZone, setSelectedSatelliteZone] = useState("East Sikkim / Gangtok Axis");
  const [satelliteAiData, setSatelliteAiData] = useState(() =>
    analyzeSatelliteWeatherRisk("East Sikkim / Gangtok Axis")
  );
  const [isSatelliteLoading, setIsSatelliteLoading] = useState(false);

  // Refresh AI Satellite Data
  const refreshSatelliteAi = async (zoneName = selectedSatelliteZone) => {
    setIsSatelliteLoading(true);
    try {
      const liveData = await fetchLiveSatelliteAiFeed(zoneName);
      setSatelliteAiData(liveData);
      setSelectedSatelliteZone(zoneName);
    } catch (err) {
      console.warn("Error refreshing satellite AI feed:", err);
    } finally {
      setIsSatelliteLoading(false);
    }
  };

  // What-If Simulator State
  const [simulatorParams, setSimulatorParams] = useState({
    rainfall24h: 145,
    soilMoistureVWC: 88,
    slopeAngle: 38,
    slopeCutAngle: 12,
    deforestationPct: 35
  });

  const [isAutoSimulating, setIsAutoSimulating] = useState(true);

  const [simulatorResult, setSimulatorResult] = useState(() =>
    calculateLandslideRisk(simulatorParams)
  );

  // Automatic AI Risk Simulation Mode - Auto-runs analysis sweeps from live satellite & IoT feeds
  useEffect(() => {
    if (!isAutoSimulating) return;

    const interval = setInterval(() => {
      const satRain = satelliteAiData?.telemetry?.satelliteRainRateMmh || 45;
      const maxSensorRain = Math.max(...sensors.map((s) => s.rainfall24h));
      const satMoisture = satelliteAiData?.telemetry?.moistureFluxIndex || 88;

      const rainDelta = (Math.random() * 6 - 3);
      const moistureDelta = (Math.random() * 2 - 1);
      const cutDelta = (Math.random() * 1.5 - 0.75);

      const targetRain = Math.min(250, Math.max(10, Math.round(maxSensorRain + satRain * 0.4 + rainDelta)));
      const targetMoisture = Math.min(100, Math.max(20, Math.round(satMoisture + moistureDelta)));
      const targetCut = Math.min(25, Math.max(0, Math.round(12 + cutDelta)));

      setSimulatorParams((prev) => ({
        ...prev,
        rainfall24h: targetRain,
        soilMoistureVWC: targetMoisture,
        slopeCutAngle: targetCut
      }));
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoSimulating, satelliteAiData, sensors]);

  // Listen to network status changes & load offline queue
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Sync offline queue count on load
    const stored = getOfflineReports();
    const unsynced = stored.filter((r) => !r.synced);
    setPendingOfflineCount(unsynced.length);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Recalculate simulator result whenever params change
  useEffect(() => {
    setSimulatorResult(calculateLandslideRisk(simulatorParams));
  }, [simulatorParams]);

  // Submit Field Report (Online or Offline)
  const addReport = (reportData) => {
    if (isOffline) {
      const offlineItem = saveReportOffline(reportData);
      setPendingOfflineCount((prev) => prev + 1);
      if (offlineItem) {
        setFieldReports((prev) => [offlineItem, ...prev]);
      }
    } else {
      const newReport = {
        ...reportData,
        id: `REP-${Date.now().toString().slice(-4)}`,
        timestamp: "Just now",
        status: "VERIFIED",
        synced: true
      };
      setFieldReports((prev) => [newReport, ...prev]);
    }
  };

  // Sync Offline Data
  const syncOfflineData = () => {
    markReportsSynced();
    setPendingOfflineCount(0);
    setFieldReports((prev) =>
      prev.map((r) => ({ ...r, synced: true, status: "VERIFIED" }))
    );
  };

  // Dispatch Emergency Unit to Village
  const dispatchNDRFUnit = (villageId) => {
    setVillages((prev) =>
      prev.map((v) =>
        v.id === villageId
          ? { ...v, evacuationStatus: "NDRF_DISPATCHED", unitsAssigned: (v.unitsAssigned || 0) + 1 }
          : v
      )
    );
    setUnitsDeployed((prev) => prev + 1);
  };

  // Update simulator sliders
  const updateSimulator = (newParams) => {
    setSimulatorParams((prev) => ({ ...prev, ...newParams }));
  };

  return (
    <DisasterDataContext.Provider
      value={{
        sensors,
        highways,
        villages,
        shelters,
        fieldReports,
        historicalRecords: nerHistoricalRecords,
        isOffline,
        setIsOffline,
        pendingOfflineCount,
        syncOfflineData,
        addReport,
        simulatorParams,
        simulatorResult,
        updateSimulator,
        isAutoSimulating,
        setIsAutoSimulating,
        unitsDeployed,
        dispatchNDRFUnit,
        showSitRepModal,
        setShowSitRepModal,
        selectedSatelliteZone,
        setSelectedSatelliteZone,
        satelliteAiData,
        isSatelliteLoading,
        refreshSatelliteAi
      }}
    >
      {children}
    </DisasterDataContext.Provider>
  );
};

export const useDisasterData = () => useContext(DisasterDataContext);
