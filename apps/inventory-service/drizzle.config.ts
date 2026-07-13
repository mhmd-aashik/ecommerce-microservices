import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/inventory-service/src/db/schema/index.ts',
  out: './apps/inventory-service/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.INVENTORY_DATABASE_URL!,
  },
});
