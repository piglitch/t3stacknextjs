import { db } from '~/server/db';
import UserProfile from '../../_components/userProfile';

export default async function Page() {
  const allposts = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model?.createdAt),
    // where: (allLikedPosts, {eq}) => (user?.id ? eq(allLikedPosts?.userId, user.id) : undefined) 
  });
  const users = await db.query.users.findMany();
  return(
    <div className='w-80 md:w-2/3 mx-auto'>
      <UserProfile users={users} allposts={allposts}/>
    </div>
  ) 
}