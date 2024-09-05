export interface Metric {
  id: number;
  userId: number;
  date: Date;
  value: number;
  unit: string;
  type: 'distance' | 'temperature';
}

export interface AddMetricDto {
  userId: number;
  date: Date;
  value: number;
  unit: string;
  type: 'distance' | 'temperature';
}

export interface GetMetricsDto {
  userId: number;
  type: 'distance' | 'temperature';
}

export interface ChartDataDto {
  userId: number;
  type: 'distance' | 'temperature';
  period: '1month' | '2months';
  unit?: string;
}
