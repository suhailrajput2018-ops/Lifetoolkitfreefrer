import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL || !db) {
      return Response.json({ 
        ok: true, 
        message: "Service running (no database configured)",
        database: false 
      });
    }
    
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: true });
  } catch (error) {
    // If database is not available, still return ok for basic health check
    return Response.json({ 
      ok: true, 
      message: "Service running (database unavailable)",
      database: false 
    });
  }
}
