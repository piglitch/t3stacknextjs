export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
}

export interface Account {
  userId: string;
  type: AdapterAccount["type"];
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}

export interface Session {
  sessionToken: string;
  userId: string;
  expires: Date;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  htmlContent: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
}
