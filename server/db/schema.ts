import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

// server/db/schema.ts
import {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  timestamp,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

export const guests = pgTable("guests", {
  id: serial("id").primaryKey(),
  parentId: integer("parent_id").references((): AnyPgColumn => guests.id),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  presence: boolean("presence").notNull(),
  alcohol: text("alcohol").array().notNull(),
  night: boolean("night").notNull(),
  allergia: text("allergia"),
  createdAt: timestamp("created_at", { withTimezone: false })
    .defaultNow()
    .notNull(),
});

export type Guest = InferSelectModel<typeof guests>;
export type NewGuest = InferInsertModel<typeof guests>;
