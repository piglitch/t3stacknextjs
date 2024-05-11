import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  out: "./src/server/db",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["t3stacknextjs_*"],
} satisfies Config;
