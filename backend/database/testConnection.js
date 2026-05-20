import { db } from "./db.js";
import { sql } from "drizzle-orm";

export async function testConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Conexão com o banco bem sucedida");
  } catch (error) {
    console.log("erro na conexão:", error);
  }
}