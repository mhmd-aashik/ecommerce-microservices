import { boolean, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const cartStatusEnum = pgEnum('cart_status', [
  'active',
  'checked_out',
  'abandoned',
  'expired',
]);

export const carts = pgTable('carts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  status: cartStatusEnum('status').default('active').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
