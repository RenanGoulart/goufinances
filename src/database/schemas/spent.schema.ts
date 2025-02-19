import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text,  } from "drizzle-orm/sqlite-core";
import { paymentMethodsSchema } from "./paymentMethod.schema";
import { categoriesSchema } from "./category.schema";

export const spentsSchema = sqliteTable('spents', {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  total_value: real("total_value").notNull(),
  total_installments: integer("total_installments").notNull(),
  date: integer("date", { mode: 'timestamp' }).notNull(),
  year: integer("year").notNull(),
  month: integer("month").notNull(),
  payment_method_id: integer("payment_method_id").notNull(),
  category_id: integer("category_id").notNull(),
  created_at: text('created_at').notNull().default(sql`(current_timestamp)`),
  updated_at: text('updated_at').notNull().default(sql`(current_timestamp)`),
})

export const spentsRelations = relations(spentsSchema, ({ one }) => ({
  paymentMethodsSchema: one(paymentMethodsSchema, { fields: [spentsSchema.payment_method_id], references: [paymentMethodsSchema.id] }),
  categoriesSchema: one(categoriesSchema, { fields: [spentsSchema.category_id], references: [categoriesSchema.id] }),
}))