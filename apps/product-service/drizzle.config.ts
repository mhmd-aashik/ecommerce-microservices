import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/product-service/src/db/schema/index.ts',
  out: './apps/product-service/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.PRODUCT_DATABASE_URL!,
  },
});
