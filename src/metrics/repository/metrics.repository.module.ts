import { Module } from '@nestjs/common';
import { MetricsRepository } from './metrics.repository';

@Module({
  providers: [MetricsRepository],
})
export class MetricsRepositoryModule {}
