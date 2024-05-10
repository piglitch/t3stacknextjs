/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "~/server/db";
import HomePage from "./_components/homePage";
import { auth } from "~/auth";


export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  const allposts = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model?.createdAt)
  });
  const users = await db.query.users.findMany();
  const allLikedPosts = await db.query.likes.findMany({
    where: (allLikedPosts, {eq}) => (user?.id ? eq(allLikedPosts?.userId, user.id) : undefined)
  });

  return (
    <main>
      <div className="w-80 md:w-2/3 mx-auto">
        <HomePage allposts={allposts} users={users} allLikedPosts={allLikedPosts}/>
      </div>
    </main>
  );
}
