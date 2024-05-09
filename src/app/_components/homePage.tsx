/* eslint-disable @next/next/no-img-element */
'use client'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ReactHtmlParse from 'html-react-parser';
import { v4 as uuidv4 } from 'uuid';
import { likePost, unlikePost } from '../lib/actions';
import { type User, type Post, type Like } from '~/types';

interface Props {
  allposts: Post[];
  users: User[];
  allLikedPosts?: Like[];
}

const HomePage: React.FC<Props> = ({allposts, users, allLikedPosts}) => {
  const handle_likes = async(post: Post) => {
    const currLikeButton = document.getElementById(post.id);
    if (currLikeButton === null) {
      return '404';
    }
    if (currLikeButton.style.color === 'white') {
      currLikeButton.style.color = 'red';
      await likePost(post);
      return 'unliked';
    } else{
      currLikeButton.style.color = 'white';
      await unlikePost(post);
    }
  }
  return (
    <div>
      {
        allposts.map((post) => (
          <div key={uuidv4()} className='mb-10'>
            <div className="each-post mb-1">
              <div className="w-full">
                <h1 className="heading-post">
                  <div>{post.title}</div>
                  <div className="text-sm font-bold text-white"> 
                    <span className="text-yellow-200"> {users.map(
                    curr_user => curr_user.id === post.userId? <img key={uuidv4()} 
                    src={curr_user.image} alt="profile_pic" 
                    width={30} height={30} className='rounded-full'
                    /> : ""
                    )}</span>
                  </div>  
                </h1>
                <div className="body-post">{ReactHtmlParse(post.htmlContent)}</div>
              </div>              
            </div>
            <div className='flex px-2 gap-4 w-full'>
              <button onClick={() => handle_likes(post)}>
                <FavoriteBorderIcon id={post?.id} key={uuidv4()}
                className={allLikedPosts?.some(x => x.postId === post?.id) ? 'text-red-600' : "text-white"} />
              </button>
              <TurnedInNotIcon />
              <div className='ml-auto text-xs font-thin italic'>~{post.createdAt.toString().slice(0, 15)}</div>
            </div> 
          </div>            
        ))
      }      
    </div>
  )
}

export default HomePage