import {
  sqliteTable,
  text,
  integer,
  unique,
} from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable(
  "tasks",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text(),
    assigneeType: text().$type<"teacher" | "admin">().notNull(),
    assigneeId: integer({ mode: "number" }),
    courseId: integer({ mode: "number" }),
    sheetId: integer({ mode: "number" }),
    dueDate: text(),
    type: text().notNull().default("assessment_reminder"),
    status: text().$type<"pending" | "done">().notNull().default("pending"),
    dedupeKey: text(),
    createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [unique().on(t.dedupeKey)],
);

export const notifications = sqliteTable("notifications", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  audienceRole: text(),
  recipientEmail: text(),
  title: text().notNull(),
  body: text(),
  category: text().notNull().default("academic"),
  icon: text(),
  read: integer({ mode: "boolean" }).notNull().default(false),
  dedupeKey: text(),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const calendarEvents = sqliteTable(
  "calendar_events",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text(),
    date: text().notNull(),
    type: text().$type<"milestone" | "reminder" | "due">().notNull(),
    courseId: integer({ mode: "number" }),
    googleEventId: text(),
    dedupeKey: text(),
    createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [unique().on(t.dedupeKey)],
);

export const messages = sqliteTable("messages", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  threadKey: text().notNull(),
  fromName: text().notNull().default("CE4 Assessment Bot"),
  toEmail: text(),
  toRole: text(),
  body: text().notNull(),
  dedupeKey: text(),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export type Task = typeof tasks.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type Message = typeof messages.$inferSelect;
