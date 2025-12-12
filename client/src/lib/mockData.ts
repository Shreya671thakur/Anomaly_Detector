import { addDays, format } from "date-fns";

export interface SensorDataPoint {
  time: string;
  value: number;
  isAnomaly: boolean;
  threshold: number;
}

export interface DashboardStats {
  totalInspections: number;
  defectRate: number;
  activeSensors: number;
  systemHealth: number;
}

export const generateSensorData = (points: number = 50): SensorDataPoint[] => {
  const data: SensorDataPoint[] = [];
  const now = new Date();
  
  for (let i = 0; i < points; i++) {
    const time = format(addDays(now, i - points), "HH:mm:ss");
    // Generate a sine wave with noise
    let value = Math.sin(i * 0.2) * 10 + 50 + (Math.random() - 0.5) * 5;
    
    // Inject anomalies randomly
    let isAnomaly = false;
    if (i > 35 && i < 40) {
      value += 20; // Spike
      isAnomaly = true;
    }

    data.push({
      time,
      value,
      isAnomaly,
      threshold: 65
    });
  }
  return data;
};

export const mockDashboardStats: DashboardStats = {
  totalInspections: 12453,
  defectRate: 2.4,
  activeSensors: 48,
  systemHealth: 98.5
};

export const mockRecentAlerts = [
  { id: 1, type: "Visual", message: "Crack detected in Assembly Line A", time: "10 min ago", severity: "high" },
  { id: 2, type: "Sensor", message: "Vibration anomaly in Motor Unit 4", time: "25 min ago", severity: "medium" },
  { id: 3, type: "System", message: "Latency spike in Data Stream", time: "1 hour ago", severity: "low" },
];

// Helper to download dynamic data
export const downloadDataAsCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;
  
  // Get headers from first object
  const headers = Object.keys(data[0]).join(",") + "\n";
  
  // Convert rows
  const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
  
  const blob = new Blob([headers + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadMockDataset = () => {
  // Create a CSV string
  const headers = "timestamp,sensor_id,vibration,temperature,pressure,label\n";
  let rows = "";
  for (let i = 0; i < 100; i++) {
    const timestamp = new Date(Date.now() - i * 1000).toISOString();
    const sensorId = "S-" + Math.floor(Math.random() * 5);
    const vib = (Math.random() * 10).toFixed(2);
    const temp = (40 + Math.random() * 20).toFixed(2);
    const press = (100 + Math.random() * 10).toFixed(2);
    const label = Math.random() > 0.95 ? 1 : 0;
    rows += `${timestamp},${sensorId},${vib},${temp},${press},${label}\n`;
  }
  
  const blob = new Blob([headers + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "industrial_anomaly_dataset_mock.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
