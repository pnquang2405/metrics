import { Provider } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';

export const databaseProviders: Provider[] = [
  {
    provide: 'PG_CONNECTION',
    useFactory: async (configService: ConfigService): Promise<Client> => {
      const client = new Client({
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
      });

      await client.connect();
      return client;
    },
    inject: [ConfigService],
  },
];
