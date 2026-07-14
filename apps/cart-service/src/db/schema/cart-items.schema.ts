import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { carts } from './carts.schema';

export const cartItems = pgTable(
  'cart_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    cartId: uuid('cart_id')
      .notNull()
      .references(() => carts.id),
    productId: uuid('product_id').notNull(),
    productNameSnapshot: varchar('product_name_snapshot', {
      length: 180,
    }).notNull(),
    productSlugSnapshot: varchar('product_slug_snapshot', {
      length: 220,
    }).notNull(),
    unitPriceSnapshot: numeric('unit_price_snapshot', {
      precision: 12,
      scale: 2,
    }).notNull(),
    quantity: integer('quantity').notNull(),
    imageUrlSnapshot: text('image_url_snapshot'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('cart_items_cart_product_unique').on(
      table.cartId,
      table.productId,
    ),
  ],
);
