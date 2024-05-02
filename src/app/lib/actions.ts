'use server'

import { auth } from '~/auth';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { v4 as uuidv4 } from 'uuid';

const session = await auth()
const userId = session?.user?.id ?? '';

export async function createPost() {
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const newPost = {
    id: uuidv4(),
    userId: userId,
    name: 'new car image',
    url: 'https://images.unsplash.com/photo-1714224806668-9d8dc105f71e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D',
  };
  await db.insert(posts).values(newPost);
}

