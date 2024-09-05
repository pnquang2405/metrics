import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsRepositoryModule } from '../repository/metrics.repository.module';

@Module({
  imports: [MetricsRepositoryModule],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsServiceModule {}
