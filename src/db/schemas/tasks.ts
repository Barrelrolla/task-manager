import { Status } from "@/types";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  text: text("text").notNull(),
  status: text("status").notNull().default("todo").$type<Status>(),
});

export type Task = typeof tasks.$inferSelect;
