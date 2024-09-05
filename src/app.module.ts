import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsControllerModule } from './metrics/controller/metrics.controller.module';

@Module({
  imports: [MetricsControllerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
