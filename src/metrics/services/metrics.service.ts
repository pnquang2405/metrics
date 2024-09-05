import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repository/metrics.repository';
import { Metric } from '../interface/metrics.i';

@Injectable()
export class MetricsService {
  constructor(private readonly repository: MetricsRepository) {}

  async addMetric(metric: Metric): Promise<void> {
    await this.repository.addMetric(metric);
  }
}
