'use client'

import { useParams } from 'next/navigation'
import ReactHtmlParse from 'html-react-parser';
import { v4 as uuidv4 } from 'uuid';
 
export default function UserProfile({users, allposts}) {
  const userInProfile = null; 
  const params = useParams<{ id: string; name: string }>()
  console.log("params: ", params)
  const user = users.map(x => x.id == params.id ? x : 'Not found')
  const userPosts = [];
  allposts.map(x => x.userId == params.id ? userPosts.push(x) : 'No post found')
  console.log(user, userPosts.map(x => x.title));


  return(
    <div className='p-4'>
      <img src={user[0].image} alt="" width={120} className='rounded-full'/>
      {user[0].name}

      <div className='p-4'>
        {
          userPosts.length > 0 ?
          userPosts.map(post => 
            <div key={uuidv4()} className='mb-10'>
            <div className='each-post mb-2'>
              <div className='w-full'>
                <h1 className='heading-post flex'><span>{post.title}</span>
                  <div className='text-sm my-auto'>
                  </div>
                </h1>
                <div className='body-post'>{ReactHtmlParse(post.htmlContent)}</div>
              </div>
            </div>
            <div className='flex px-2 gap-4 w-full'>
              {/* <button onClick={() => handle_likes(post)}><FavoriteBorderIcon /></button> */}
              <div className='ml-auto text-xs font-thin italic'>~{post.createdAt.toString().slice(0, 15)}</div>
            </div> 
          </div>                  
          ) : "User has no posts."
        }
      </div>
    </div>

  ) 
}