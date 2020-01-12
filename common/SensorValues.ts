export type SensorValues = {
  systemAppId: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  positionAccuracy?: number;
  direction?: number;
  velocity?: number;
  timestamp?: number;
};

export type SensorDataWithoutId = {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  positionAccuracy?: number;
  direction?: number;
  velocity?: number;
  timestamp?: number;
};
