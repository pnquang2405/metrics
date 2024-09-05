import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MetricsService } from '../services/metrics.service';
import { ResponseDto } from '../../utils/dto/response.dto';
import { Metric } from '../interface/metrics.i';

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
      throw new BadRequestException('Error adding metric');
    }
  }
}
