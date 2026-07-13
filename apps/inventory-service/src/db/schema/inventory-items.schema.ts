import {
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';
import { warehouses } from './warehouses.schema';

export const inventoryItems = pgTable(
  'inventory_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    productId: uuid('product_id').notNull(),
    warehouseId: uuid('warehouse_id')
      .notNull()
      .references(() => warehouses.id),
    quantityOnHand: integer('quantity_on_hand').default(0).notNull(),
    quantityReserved: integer('quantity_reserved').default(0).notNull(),
    reorderLevel: integer('reorder_level').default(0).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('inventory_product_warehouse_unique').on(
      table.productId,
      table.warehouseId,
    ),
  ],
);
