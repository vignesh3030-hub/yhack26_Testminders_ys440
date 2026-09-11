import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDisasterData } from "../../context/DisasterDataContext";
import { useLanguage } from "../../context/LanguageContext";
import { MapControls } from "./MapControls";
import { FeatureDetailsModal } from "./FeatureDetailsModal";

// 100% Free, Keyless, Watermark-Free Map & Satellite Tile Providers
const mapTileProviders = {
  dark: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom",
    maxZoom: 16
  },
  street: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom",
    maxZoom: 19
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18
  }
};

// Custom Leaflet DivIcon Generators for rich UI markers
const createCustomIcon = (color, text, isCritical = false) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div class="relative flex items-center justify-center">
        ${isCritical ? `<div class="absolute w-8 h-8 rounded-full bg-red-500/50 animate-ping"></div>` : ""}
        <div class="w-7 h-7 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style="background-color: ${color}">
          ${text}
        </div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

// Helper component to handle smooth map panning when sector is clicked
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export const RiskMap = () => {
  const { t } = useLanguage();
  const { sensors, highways, villages, shelters, fieldReports } = useDisasterData();

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [featureType, setFeatureType] = useState(null);

  const [mapCenter, setMapCenter] = useState([18.5000, 83.5000]);
  const [mapZoom, setMapZoom] = useState(5);
  const [tileStyle, setTileStyle] = useState("street"); // "street" high-contrast English map

  const [layers, setLayers] = useState({
    heatmap: true,
    sensors: true,
    highways: true,
    villages: true,
    shelters: true,
    fieldReports: true
  });

  const handleSelectSector = (sectorKey) => {
    if (sectorKey === "TN") {
      setMapCenter([11.2000, 77.8000]);
      setMapZoom(8);
    } else if (sectorKey === "NER") {
      setMapCenter([26.2000, 92.5000]);
      setMapZoom(7);
    } else {
      setMapCenter([18.5000, 83.5000]);
      setMapZoom(5);
    }
  };

  const openDetails = (item, type) => {
    setSelectedFeature(item);
    setFeatureType(type);
  };

  const activeProvider = mapTileProviders[tileStyle] || mapTileProviders.dark;

  return (
    <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      {/* Map Controls Panel with Sector & Style Selectors */}
      <MapControls
        layers={layers}
        setLayers={setLayers}
        onSelectSector={handleSelectSector}
        tileStyle={tileStyle}
        setTileStyle={setTileStyle}
      />

      {/* Leaflet Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        {/* 100% Free, Keyless Esri Tile Layer in English */}
        <TileLayer
          key={tileStyle}
          attribution={activeProvider.attribution}
          url={activeProvider.url}
          maxZoom={activeProvider.maxZoom}
        />

        {/* 1. RISK HEATMAP CIRCLES LAYER */}
        {layers.heatmap &&
          sensors.map((sensor) => (
            <Circle
              key={`heat-${sensor.id}`}
              center={[sensor.lat, sensor.lng]}
              radius={sensor.riskLevel === "CRITICAL" ? 35000 : 20000}
              pathOptions={{
                color: sensor.riskLevel === "CRITICAL" ? "#EF4444" : sensor.riskLevel === "HIGH" ? "#F97316" : "#EAB308",
                fillColor: sensor.riskLevel === "CRITICAL" ? "#EF4444" : sensor.riskLevel === "HIGH" ? "#F97316" : "#EAB308",
                fillOpacity: 0.25,
                weight: 1.5
              }}
            />
          ))}

        {/* 2. IoT SENSOR NODES MARKERS */}
        {layers.sensors &&
          sensors.map((sensor) => {
            const isCrit = sensor.riskLevel === "CRITICAL";
            const color = isCrit ? "#EF4444" : sensor.riskLevel === "HIGH" ? "#F97316" : "#10B981";
            const icon = createCustomIcon(color, "SN", isCrit);

            return (
              <Marker
                key={sensor.id}
                position={[sensor.lat, sensor.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => openDetails(sensor, "sensor")
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1 text-xs">
                    <span className="font-bold text-red-400 block">{sensor.name}</span>
                    <p className="text-slate-300">
                      {t("mapPopups.rain24h") || "24h Rain"}: <strong className="text-white">{sensor.rainfall24h} mm</strong>
                    </p>
                    <p className="text-slate-300">
                      {t("mapPopups.fsFactor") || "Fs (Safety Factor)"}: <strong className="text-amber-300">{sensor.fs}</strong>
                    </p>
                    <button
                      onClick={() => openDetails(sensor, "sensor")}
                      className="mt-1.5 w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold py-1 px-2 rounded text-[11px] cursor-pointer"
                    >
                      {t("mapPopups.viewTelemetry") || "View Station Telemetry"}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* 3. HIGHWAYS LAYER */}
        {layers.highways &&
          highways.map((hw) => {
            const isCrit = hw.riskLevel === "CRITICAL";
            const color = isCrit ? "#EF4444" : "#F97316";
            const icon = createCustomIcon(color, "HW");

            return (
              <Marker
                key={hw.id}
                position={[hw.lat, hw.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => openDetails(hw, "highway")
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1 text-xs">
                    <strong className="text-amber-400 block">{hw.name}</strong>
                    <span className="text-slate-300 block">{hw.criticalSegment}</span>
                    <span className="text-red-400 font-semibold">{hw.status}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* 4. VILLAGES LAYER */}
        {layers.villages &&
          villages.map((vil) => {
            const isCrit = vil.riskLevel === "CRITICAL";
            const color = isCrit ? "#DC2626" : "#3B82F6";
            const icon = createCustomIcon(color, "V");

            return (
              <Marker
                key={vil.id}
                position={[vil.lat, vil.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => openDetails(vil, "village")
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1 text-xs">
                    <strong className="text-emerald-400 block">{vil.name}</strong>
                    <span className="text-slate-300 block">
                      {t("mapPopups.population") || "Pop"}: {vil.population.toLocaleString()}
                    </span>
                    <span className="text-amber-300 font-bold">{vil.evacuationStatus}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* 5. RELIEF SHELTERS LAYER */}
        {layers.shelters &&
          shelters.map((shl) => {
            const icon = createCustomIcon("#06B6D4", "S");

            return (
              <Marker
                key={shl.id}
                position={[shl.lat, shl.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => openDetails(shl, "shelter")
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1 text-xs">
                    <strong className="text-cyan-400 block">{shl.name}</strong>
                    <span className="text-slate-300">Cap: {shl.occupied}/{shl.capacity}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* 6. FIELD REPORTS LAYER */}
        {layers.fieldReports &&
          fieldReports.map((rep) => {
            const icon = createCustomIcon("#A855F7", "R");

            return (
              <Marker
                key={rep.id}
                position={[rep.lat, rep.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => openDetails(rep, "report")
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1 text-xs">
                    <strong className="text-purple-400 block">{rep.hazardType}</strong>
                    <span className="text-slate-300">{rep.locationName}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {/* Feature Details Modal Popup */}
      {selectedFeature && (
        <FeatureDetailsModal
          item={selectedFeature}
          type={featureType}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  );
};
