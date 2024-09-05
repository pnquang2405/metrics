import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsServiceModule } from '../services/metrics.service.module';

@Module({
  controllers: [MetricsController],
  imports: [MetricsServiceModule],
})
export class MetricsControllerModule {}
