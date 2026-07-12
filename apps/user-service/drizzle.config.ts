import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/user-service/src/db/schema/index.ts',
  out: './apps/user-service/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.USER_DATABASE_URL!,
  },
});
