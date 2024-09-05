import { Module } from '@nestjs/common';
import { MetricsRepository } from './metrics.repository';
import { Client } from 'pg';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [
    {
      provide: Client,
      useValue: new Client({}),
    },
    MetricsRepository,
  ],
  exports: [MetricsRepository],
  imports: [DatabaseModule],
})
export class MetricsRepositoryModule {}
