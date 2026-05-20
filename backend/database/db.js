import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { configDotenv } from "dotenv";
configDotenv();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
const db = drizzle(pool);

export { db };