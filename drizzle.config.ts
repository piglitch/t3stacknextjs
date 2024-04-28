import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  out: "./src/server/db",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["t3stacknextjs_*"],
} satisfies Config;
