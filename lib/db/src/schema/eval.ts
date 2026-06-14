import {
  sqliteTable,
  text,
  integer,
  unique,
} from "drizzle-orm/sqlite-core";

export const evalTemplates = sqliteTable("eval_templates", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  key: text().notNull().unique(),
  name: text().notNull(),
  nameAr: text(),
  subjectType: text().$type<"teacher" | "student">().notNull().default("teacher"),
  layout: text().$type<"columns" | "weekly">().notNull().default("columns"),
  termLabel: text(),
  description: text(),
  orderIndex: integer({ mode: "number" }).notNull().default(0),
  active: integer({ mode: "boolean" }).notNull().default(true),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const evalCriteria = sqliteTable("eval_criteria", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  templateId: integer({ mode: "number" }).notNull(),
  key: text().notNull(),
  labelEn: text().notNull(),
  labelAr: text(),
  kind: text().$type<"score" | "text">().notNull().default("score"),
  maxScore: integer({ mode: "number" }).notNull().default(5),
  orderIndex: integer({ mode: "number" }).notNull().default(0),
  active: integer({ mode: "boolean" }).notNull().default(true),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const evalSheets = sqliteTable(
  "eval_sheets",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    templateId: integer({ mode: "number" }).notNull(),
    termLabel: text().notNull(),
    weekLabel: text().notNull().default(""),
    dueDate: text(),
    status: text().$type<"open" | "submitted" | "locked">().notNull().default("open"),
    assessorId: integer({ mode: "number" }),
    submittedAt: integer({ mode: "timestamp_ms" }),
    reportsGeneratedAt: integer({ mode: "timestamp_ms" }),
    createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [
    unique().on(t.templateId, t.termLabel, t.weekLabel),
  ],
);

export const evalScores = sqliteTable(
  "eval_scores",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    sheetId: integer({ mode: "number" }).notNull(),
    teacherId: integer({ mode: "number" }).notNull(),
    criterionId: integer({ mode: "number" }).notNull(),
    day: integer({ mode: "number" }).notNull().default(0),
    score: integer({ mode: "number" }),
    note: text(),
    updatedAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [
    unique().on(t.sheetId, t.teacherId, t.criterionId, t.day),
  ],
);

export const evalDayMeta = sqliteTable(
  "eval_day_meta",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    sheetId: integer({ mode: "number" }).notNull(),
    teacherId: integer({ mode: "number" }).notNull(),
    day: integer({ mode: "number" }).notNull(),
    minutes: integer({ mode: "number" }),
    updatedAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [
    unique().on(t.sheetId, t.teacherId, t.day),
  ],
);

export type EvalTemplate = typeof evalTemplates.$inferSelect;
export type EvalCriterion = typeof evalCriteria.$inferSelect;
export type EvalSheet = typeof evalSheets.$inferSelect;
export type EvalScore = typeof evalScores.$inferSelect;
export type EvalDayMeta = typeof evalDayMeta.$inferSelect;
