import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const {handlers, auth, signOut} = NextAuth({
  // Configure providers here
  providers: [
    GithubProvider({
      clientId: 'Ov23li3sWXtMqbz8KZRi', 
      clientSecret: '7fc31ef4df992680b41366c2fd2d06c3b51cb747'
    }),
  ],
  adapter: DrizzleAdapter(db),
});
