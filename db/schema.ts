import { pgTable, text } from "drizzle-orm/pg-core";

export const testingSchema = pgTable("testingSchema", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
});
