import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DRIZZLE_DB } from './database.constants';

export function createDatabaseProvider(databaseUrlKey: string): Provider {
  return {
    provide: DRIZZLE_DB,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const connectionString = configService.getOrThrow<string>(databaseUrlKey);

      const pool = new Pool({
        connectionString,
      });

      return drizzle(pool);
    },
  };
}
