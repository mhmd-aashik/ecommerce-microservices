import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type ProductDatabase = ReturnType<typeof drizzle<typeof schema>>;
