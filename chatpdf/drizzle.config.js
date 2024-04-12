/** @type { import("drizzle-kit").Config } */
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  schema: "./src/lib/db/schema.js",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
// npx drizzle-kit push:pg
