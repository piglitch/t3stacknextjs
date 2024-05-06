/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { v4 as uuidv4 } from 'uuid';
import ReactHtmlParse from 'html-react-parser';

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const allposts = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model?.id)
  });
  const users = await db.query.users.findMany();
  return (
    <main>
      <div className="max-w-5xl min-w-96 mx-auto">
        {
          allposts.map((post) => (
            <div key={uuidv4()} className="each-post">
              <div className="w-full">
                <h1 className="heading-post">
                  <div>{post.title}</div>
                  <div className="text-sm font-bold text-teal-50"> 
                    Uploaded by/ 
                    <span className="text-yellow-200"> {users.map(
                    user => user.id === post.userId? user.name : ""
                    )}</span>
                  </div>  
                </h1>
                <div className="body-post">{ReactHtmlParse(post.htmlContent)}</div>
              </div>              
            </div>
          ))
        }
      </div>
    </main>
  );
}
