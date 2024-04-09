import { drizzle } from "drizzle-orm/postgres-js";
import * as testSchema from "./schema";
import postgres from "postgres";
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient, { schema: testSchema });
export { db };
