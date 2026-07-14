import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/cart-service/src/db/schema/index.ts',
  out: './apps/cart-service/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.CART_DATABASE_URL!,
  },
});
