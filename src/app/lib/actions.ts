/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { auth } from '~/auth';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

const session = await auth()
const userId = session?.user?.id ?? '';

// export async function getAllPostsFromUser(allposts) {
//   const user = session?.user;
//   const posts = await db.query.posts.findMany({
//     where: (posts, {eq}) => (user?.id ? eq(posts?.userId, user.id) : undefined),
//   });
//   allposts = posts;
// }

export async function createPost(post: any, title: string) {
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

export async function deletePostFromUser(post: any) {
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  await db.delete(posts).where(eq(posts.id, post.id))
}


