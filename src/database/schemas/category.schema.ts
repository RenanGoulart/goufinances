import { sql } from "drizzle-orm";
import { integer, sqliteTable, text,  } from "drizzle-orm/sqlite-core";

export const categoriesSchema = sqliteTable('categories', {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  created_at: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updated_at: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`),
})