/**
 * Offline Storage & Synchronization Manager
 * Uses LocalStorage / IndexedDB fallback for low-connectivity North East India regions.
 */

const STORAGE_KEY = "NER_LANDSLIDE_OFFLINE_REPORTS";

export function getOfflineReports() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading offline storage:", err);
    return [];
  }
}

export function saveReportOffline(report) {
  try {
    const reports = getOfflineReports();
    const newReport = {
      ...report,
      id: `OFFLINE-${Date.now()}`,
      timestamp: new Date().toISOString(),
      synced: false,
      status: "PENDING_SYNC"
    };
    reports.push(newReport);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    return newReport;
  } catch (err) {
    console.error("Error saving report offline:", err);
    return null;
  }
}

export function clearOfflineReports() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.error("Error clearing offline storage:", err);
  }
}

export function markReportsSynced() {
  try {
    const reports = getOfflineReports();
    const updated = reports.map(r => ({ ...r, synced: true, status: "VERIFIED" }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error syncing offline reports:", err);
    return [];
  }
}
