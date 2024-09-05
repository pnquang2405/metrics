import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { AddMetricDto } from '../interface/metrics.i';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class MetricsRepository {
  constructor(@Inject('PG_CONNECTION') private readonly IClient: Client) {}

  async addMetric(addMetricDto: AddMetricDto): Promise<void> {
    try {
      const sql = readFileSync(
        join(process.cwd(), './src/metrics/sql/add_metric.sql'),
      ).toString();

      await this.IClient.query(sql, [
        addMetricDto.userId,
        addMetricDto.date,
        addMetricDto.value,
        addMetricDto.unit,
        addMetricDto.type,
      ]);
    } catch (error) {
      console.log(error.message);
    }
  }
}
