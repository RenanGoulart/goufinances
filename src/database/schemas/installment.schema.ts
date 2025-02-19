import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text,  } from "drizzle-orm/sqlite-core";
import { spentsSchema } from "./spent.schema";

export const installmentsSchema = sqliteTable('installments', {
  id: integer("id").primaryKey({ autoIncrement: true }),
  installment_number: text("installment_number").notNull(),
  value: real("value").notNull(),
  expiration_date: text("expiration_date").notNull(),
  year: integer("year").notNull(),
  month: integer("month").notNull(),
  spent_id: integer("spent_id").notNull(),
  created_at: text('created_at')
      .default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text('updated_at')
      .default(sql`(CURRENT_TIMESTAMP)`),
})

export const installmentsRelations = relations(installmentsSchema, ({ one }) => ({
  spentsSchema: one(spentsSchema, { fields: [installmentsSchema.spent_id], references: [spentsSchema.id] }),
}))