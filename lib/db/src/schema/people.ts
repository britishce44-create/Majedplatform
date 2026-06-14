import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const teachers = sqliteTable("teachers", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull(),
  phone: text(),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const parents = sqliteTable("parents", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull(),
  phone: text(),
  locale: text().notNull().default("ar"),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const students = sqliteTable("students", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  courseId: integer({ mode: "number" }),
  parentId: integer({ mode: "number" }),
  level: text(),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export type Teacher = typeof teachers.$inferSelect;
export type Parent = typeof parents.$inferSelect;
export type Student = typeof students.$inferSelect;
