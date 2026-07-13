import { integer, pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { inventoryItems } from './inventory-items.schema';

export const reservationStatusEnum = pgEnum('reservation_status', [
  'active',
  'confirmed',
  'released',
  'expired',
]);

export const stockReservations = pgTable('stock_reservations', {
  id: uuid('id').defaultRandom().primaryKey(),
  inventoryItemId: uuid('inventory_item_id')
    .notNull()
    .references(() => inventoryItems.id),
  orderId: uuid('order_id').notNull(),
  quantity: integer('quantity').notNull(),
  status: reservationStatusEnum('status').default('active').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
