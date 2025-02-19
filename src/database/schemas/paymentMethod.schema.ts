import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text,  } from "drizzle-orm/sqlite-core";

export const paymentMethodsSchema = sqliteTable('payment_methods', {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
})