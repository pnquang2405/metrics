import { IsString, Validate } from 'class-validator';
import { IsValidInterval } from 'src/utils/validator/validator';

type DistanceUnit = 'meter' | 'centimeter' | 'inch' | 'feet' | 'yard';
type TemperatureUnit = 'C' | 'F' | 'K';
type Unit = DistanceUnit | TemperatureUnit;
type TypeMetric = 'Distance' | 'Temperature';

export interface Metric {
  userId: number;
  date: Date;
  value: number;
  unit: Unit;
  type: TypeMetric;
}

export interface AddMetricDto {
  userId: number;
  date: Date;
  value: number;
  unit: Unit;
  type: TypeMetric;
}

export interface GetMetricsDto {
  userId: number;
  type: TypeMetric;
  unit?: Unit;
}

export interface MetricResponse {
  userId: number;
  date: Date;
  value: number;
  unit: Unit;
  type: TypeMetric;
}

export class GetMetricChart {
  @IsString()
  userId: number;

  @IsString()
  type: TypeMetric;

  @IsString()
  unit?: Unit;

  @IsString()
  @Validate(IsValidInterval)
  period: string;
}
