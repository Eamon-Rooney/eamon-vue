export interface VoltageReading {
  timestamp: string
  voltage: string
}

export interface Asset {
  assetId: number
  name: string
  region: string
  health: string
  lastTenVoltageReadings: VoltageReading[]
}

export interface Trace {
  assetId: number;
  x: string[];
  y: number[];
  type: string;
  mode: string;
  name: string;
  marker: { color: string };
  visible: boolean;
}