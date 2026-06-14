import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const appUsers = sqliteTable("app_users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  password: text().notNull(),
  name: text().notNull(),
  role: text().$type<"admin" | "supervisor" | "teacher" | "student" | "parent">().notNull(),
  teacherId: integer({ mode: "number" }),
  parentId: integer({ mode: "number" }),
  studentId: integer({ mode: "number" }),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const sessions = sqliteTable("sessions", {
  token: text().primaryKey(),
  email: text().notNull(),
  name: text().notNull(),
  role: text().notNull(),
  teacherId: integer({ mode: "number" }),
  parentId: integer({ mode: "number" }),
  studentId: integer({ mode: "number" }),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export type AppUser = typeof appUsers.$inferSelect;
export type Session = typeof sessions.$inferSelect;
