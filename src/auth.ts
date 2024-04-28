import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const {handlers, auth, signOut} = NextAuth({
  // Configure providers here
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
],
  adapter: DrizzleAdapter(db),
});
