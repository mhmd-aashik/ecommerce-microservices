import { DynamicModule, Module } from '@nestjs/common';
import { createDatabaseProvider } from './database.provider';
import { DatabaseHealthService } from '../health';

@Module({})
export class DatabaseModule {
  static forRoot(databaseUrlKey: string): DynamicModule {
    const databaseProvider = createDatabaseProvider(databaseUrlKey);
    return {
      module: DatabaseModule,
      providers: [databaseProvider, DatabaseHealthService],
      exports: [databaseProvider, DatabaseHealthService],
    };
  }
}
