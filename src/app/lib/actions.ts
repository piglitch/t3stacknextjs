/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { auth } from '~/auth';
import { db } from '~/server/db';
import { likes, posts } from '~/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { type User, type Post, type Like } from '~/types';


export async function createPost(post: string, title: string) {
  const session = await auth()
  const userId = session?.user?.id ?? '';
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const newPost = {
    id: uuidv4(),
    userId: userId,
    title: title,
    htmlContent: post,    
  };
  await db.insert(posts).values(newPost);
}

export async function likePost(post: Post) {
  const session = await auth()
  const userId = session?.user?.id ?? '';
  if (!session?.user?.id) {
    return 'unauthorized';
  }
  const newPost = {
    id: uuidv4(),
    postId: post.id,   
    userId: post.userId,
  };
  await db.insert(likes).values(newPost);
  await db.update(posts).set({
    numberoflikes: post.numberoflikes + 1
  }).where(eq(posts.id, post.id))
}

export async function unlikePost(post: Post) {
  const session = await auth()
  if (!session?.user?.id) {
    return "Unauthorized";
  }  
  await db.delete(likes).where(eq(likes.postId, post.id));
  await db.update(posts).set({
    numberoflikes: Math.max(post.numberoflikes - 1, 0)
  }).where(eq(posts.id, post.id))
}

export async function deletePostFromUser(post: Post) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  await db.delete(posts).where(eq(posts.id, post.id))
}



