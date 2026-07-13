import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { inventoryItems } from './inventory-items.schema';

export const movementTypeEnum = pgEnum('movement_type', [
  'stock_in',
  'stock_out',
  'reservation_created',
  'reservation_released',
  'reservation_confirmed',
  'adjustment',
]);

export const inventoryMovements = pgTable('inventory_movements', {
  id: uuid('id').defaultRandom().primaryKey(),
  inventoryItemId: uuid('inventory_item_id')
    .notNull()
    .references(() => inventoryItems.id),
  type: movementTypeEnum('type').notNull(),
  quantity: integer('quantity').notNull(),
  referenceId: uuid('reference_id'),
  reason: text('reason'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
