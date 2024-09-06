import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { MetricsService } from '../services/metrics.service';
import { ResponseDto } from '../../utils/dto/response.dto';
import {
  GetMetricChart,
  GetMetricsDto,
  Metric,
  MetricResponse,
} from '../interface/metrics.i';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addMetric(@Body() metric: Metric): Promise<ResponseDto<void>> {
    try {
      await this.service.addMetric(metric);
      return {
        success: true,
        message: 'Metric added successfully',
        httpStatus: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        success: false,
        message: `Metric added failed: ${error.message}`,
        httpStatus: HttpStatus.BAD_REQUEST,
      };
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async getMetrics(
    @Query() params: GetMetricsDto,
  ): Promise<ResponseDto<Array<MetricResponse>>> {
    try {
      const result = await this.service.getMetricsByUser(params);
      return {
        success: true,
        message: 'Get List Metrics By User Successfully',
        httpStatus: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: `Get List Metrics By User Failed: ${error.message}`,
        httpStatus: HttpStatus.BAD_REQUEST,
      };
    }
  }

  @Get('chart')
  @HttpCode(HttpStatus.OK)
  async getDataForChart(
    @Query() params: GetMetricChart,
  ): Promise<ResponseDto<Array<MetricResponse>>> {
    try {
      const result = await this.service.getDataForChart(params);
      return {
        success: true,
        message: 'Get List Metrics For Chart Successfully',
        httpStatus: HttpStatus.OK,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: `Get List Metrics For Chart Failed: ${error.message}`,
        httpStatus: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
