import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MetricsControllerModule } from './metrics/controller/metrics.controller.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MetricsControllerModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
