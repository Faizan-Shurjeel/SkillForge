import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  gradient: text("gradient").notNull(),
  price_pkr: integer("price_pkr").notNull(),
  price_usd: integer("price_usd").notNull(),
  duration: text("duration").notNull(),
  level: text("level").notNull(),
  topics: json("topics").$type<string[]>().notNull(),
  tools: json("tools").$type<string[]>().notNull(),
  outline: text("outline").notNull(),
  certification: text("certification").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  gradient: text("gradient").notNull(),
  image_url: text("image_url").notNull(),
  price_pkr_min: integer("price_pkr_min"),
  price_pkr_max: integer("price_pkr_max"),
  price_usd_min: integer("price_usd_min"),
  price_usd_max: integer("price_usd_max"),
  services_included: json("services_included").$type<string[]>().notNull(),
  tools: json("tools").$type<string[]>().notNull(),
  deliverables: json("deliverables").$type<string[]>().notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  course_id: varchar("course_id").references(() => courses.id).notNull(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  experience_level: text("experience_level").notNull(),
  learning_goals: text("learning_goals").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service_id: varchar("service_id").references(() => services.id),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  project_description: text("project_description").notNull(),
  inquiry_type: text("inquiry_type").notNull(), // 'service' or 'general'
  created_at: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  created_at: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  created_at: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  created_at: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  created_at: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
