import {
  sqliteTable,
  text,
  integer,
  unique,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const criteria = sqliteTable("criteria", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  labelEn: text().notNull(),
  labelAr: text().notNull(),
  orderIndex: integer({ mode: "number" }).notNull().default(0),
  active: integer({ mode: "boolean" }).notNull().default(true),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const assessmentSheets = sqliteTable(
  "assessment_sheets",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    courseId: integer({ mode: "number" }).notNull(),
    termLabel: text().notNull(),
    phase: text().$type<"first" | "last">().notNull(),
    teachingDay: integer({ mode: "number" }).notNull(),
    dueDate: text().notNull(),
    status: text().$type<"open" | "submitted" | "locked">().notNull().default("open"),
    submittedAt: integer({ mode: "timestamp_ms" }),
    reportsGeneratedAt: integer({ mode: "timestamp_ms" }),
    createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [unique().on(t.courseId, t.termLabel, t.phase)],
);

export const assessmentScores = sqliteTable(
  "assessment_scores",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    sheetId: integer({ mode: "number" }).notNull(),
    studentId: integer({ mode: "number" }).notNull(),
    criterionId: integer({ mode: "number" }).notNull(),
    score: integer({ mode: "number" }),
    updatedAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [
    unique().on(t.sheetId, t.studentId, t.criterionId),
  ],
);

export const dailyMonitoring = sqliteTable("daily_monitoring", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  studentId: integer({ mode: "number" }).notNull(),
  courseId: integer({ mode: "number" }).notNull(),
  date: text().notNull(),
  summary: text().notNull(),
  rating: integer({ mode: "number" }),
  createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
});

export const reports = sqliteTable(
  "reports",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    kind: text().$type<"student" | "teacher_eval">().notNull().default("student"),
    sheetId: integer({ mode: "number" }),
    studentId: integer({ mode: "number" }),
    courseId: integer({ mode: "number" }),
    evalSheetId: integer({ mode: "number" }),
    evalTeacherId: integer({ mode: "number" }),
    audience: text().$type<"parent" | "teacher">().notNull(),
    language: text().$type<"ar" | "en">().notNull(),
    recipientEmail: text().notNull(),
    recipientName: text(),
    level: text(),
    body: text().notNull(),
    status: text().$type<"draft" | "edited" | "sent" | "failed">().notNull().default("draft"),
    emailStatus: text().$type<"pending" | "sent" | "failed" | "skipped">().notNull().default("pending"),
    emailError: text(),
    sentAt: integer({ mode: "timestamp_ms" }),
    driveStatus: text().$type<"pending" | "archived" | "failed" | "skipped">().notNull().default("pending"),
    driveFileId: text(),
    driveLink: text(),
    createdAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
    updatedAt: integer({ mode: "timestamp_ms" }).notNull().$default(() => Date.now()),
  },
  (t) => [
    unique().on(t.sheetId, t.studentId, t.audience),
    uniqueIndex("uq_report_eval")
      .on(t.evalSheetId, t.evalTeacherId)
      .where(sql`kind = 'teacher_eval'`),
  ],
);

export type Criterion = typeof criteria.$inferSelect;
export type AssessmentSheet = typeof assessmentSheets.$inferSelect;
export type AssessmentScore = typeof assessmentScores.$inferSelect;
export type DailyMonitoring = typeof dailyMonitoring.$inferSelect;
export type Report = typeof reports.$inferSelect;
