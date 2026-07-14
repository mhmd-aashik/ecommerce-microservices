import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type CartDatabase = ReturnType<typeof drizzle<typeof schema>>;
