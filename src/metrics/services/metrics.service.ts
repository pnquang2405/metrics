import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repository/metrics.repository';
import {
  GetMetricChart,
  GetMetricsDto,
  Metric,
  MetricResponse,
} from '../interface/metrics.i';
import { convertUnits } from 'src/utils/converter/converter';

@Injectable()
export class MetricsService {
  constructor(private readonly repository: MetricsRepository) {}

  async addMetric(metric: Metric): Promise<void> {
    await this.repository.addMetric(metric);
  }

  async getMetricsByUser(
    params: GetMetricsDto,
  ): Promise<Array<MetricResponse>> {
    try {
      return (await this.repository.getMetricsByUser(params)).map((res) => ({
        ...res,
        unit: params.unit ? params.unit : res.unit,
        value:
          !params.unit || params.unit === res.unit
            ? res.value
            : convertUnits(res.value, res.unit, params.unit),
      }));
    } catch (error) {
      throw new Error(`Failed to get metrics by user: ${error.message}`);
    }
  }

  async getDataForChart(
    params: GetMetricChart,
  ): Promise<Array<MetricResponse>> {
    try {
      return (await this.repository.getChartData(params)).map((res) => ({
        ...res,
        unit: params.unit ? params.unit : res.unit,
        value:
          !params.unit || params.unit === res.unit
            ? res.value
            : convertUnits(res.value, res.unit, params.unit),
      }));
    } catch (error) {
      throw new Error(`Failed to get metrics for chart: ${error.message}`);
    }
  }
}
