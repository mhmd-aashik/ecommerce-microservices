import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { DRIZZLE_DB } from '../tokens/database.tokens';

@Injectable()
export class DatabaseHealthService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: any) {}

  async check() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.db.execute(sql`SELECT 1`);

    return {
      database: 'UP',
    };
  }
}
