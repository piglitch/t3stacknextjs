import "dotenv/config"
import { migrate } from "drizzle-orm/node-postgres/migrator";
import postgres from "postgres";
import { db } from "~/server/db";

const migrationClient = postgres(process.env.POSTGRES_URL!, {max:1})

await migrate(db, { migrationsFolder: './src/server/db' })
await migrationClient.end()
