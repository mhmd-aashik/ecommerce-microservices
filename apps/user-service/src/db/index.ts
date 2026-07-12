import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

export type UserDatabase = ReturnType<typeof drizzle<typeof schema>>;
