import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import {
  AddMetricDto,
  GetMetricChart,
  GetMetricsDto,
  MetricResponse,
} from '../interface/metrics.i';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class MetricsRepository {
  private dirSql = join(process.cwd(), './src/metrics/sql');
  constructor(@Inject('PG_CONNECTION') private readonly IClient: Client) {}

  async addMetric(addMetricDto: AddMetricDto): Promise<void> {
    try {
      const sql = readFileSync(`${this.dirSql}/add_metric.sql`).toString();

      await this.IClient.query(sql, [
        addMetricDto.userId,
        addMetricDto.date,
        addMetricDto.value,
        addMetricDto.unit,
        addMetricDto.type,
      ]);
    } catch (error) {
      throw new Error(`Failed to add metric: ${error.message}`);
    }
  }

  async getMetricsByUser(
    params: GetMetricsDto,
  ): Promise<Array<MetricResponse>> {
    try {
      const sql = readFileSync(
        `${this.dirSql}/get_metrics_by_user.sql`,
      ).toString();

      const resultSql = await this.IClient.query(sql, [
        params.userId,
        params.type,
      ]);

      return resultSql.rows.map((row: MetricResponse) => row);
    } catch (error) {
      throw new Error(`Failed to fetch metrics: ${error.message}`);
    }
  }

  async getChartData(params: GetMetricChart): Promise<Array<MetricResponse>> {
    try {
      const sql = readFileSync(
        `${this.dirSql}/get_metrics_for_chart.sql`,
      ).toString();

      return (
        await this.IClient.query(sql, [
          params.userId,
          params.type,
          params.period,
        ])
      ).rows.map((row) => row);
    } catch (error) {
      throw new Error(`Failed to fetch metrics for chart: ${error.message}`);
    }
  }
}
