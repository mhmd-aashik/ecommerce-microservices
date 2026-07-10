import { DynamicModule, Module } from '@nestjs/common';
import { createDatabaseProvider } from './database.provider';

@Module({})
export class DatabaseModule {
  static forRoot(databaseUrlKey: string): DynamicModule {
    const databaseProvider = createDatabaseProvider(databaseUrlKey);
    return {
      module: DatabaseModule,
      providers: [databaseProvider],
      exports: [databaseProvider],
    };
  }
}
