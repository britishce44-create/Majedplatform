import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const courses = sqliteTable("courses", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  level: text(),
  teacherId: integer({ mode: "number" }),
  termLabel: text().notNull(),
  termStartDate: text().notNull(),
  teachingWeekdays: text().notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export type Course = typeof courses.$inferSelect;
