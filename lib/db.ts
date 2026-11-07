import { neon } from "@neondatabase/serverless";
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
export const sql = neon(process.env.DATABASE_URL);
export async function ensureUser(userId: number) {
  await sql`INSERT INTO users (telegram_id) VALUES (${userId}) ON CONFLICT (telegram_id) DO NOTHING`;
  await sql`INSERT INTO cells (telegram_user_id, name, is_inbox) SELECT ${userId}, 'Без ячейки', TRUE WHERE NOT EXISTS (SELECT 1 FROM cells WHERE telegram_user_id = ${userId} AND is_inbox = TRUE)`;
}
