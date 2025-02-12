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