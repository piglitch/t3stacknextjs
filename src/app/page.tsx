/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { v4 as uuidv4 } from 'uuid';

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.posts.findMany({
    orderBy: (model, {desc}) => desc(model.id)
  });
  const users = await db.query.users.findMany();
  return (
    <main>
      <div className="flex flex-wrap gap-4 ml-6">
        {
          [...images, ...images, ...images].map((image) => (
            <div key={uuidv4()} className="flex flex-col w-48">
              <Image src={image.url} alt="carslol" width={480} height={80}/>
              <div>{image.name}</div>
              <div>Uploader: {users.map(
                user => user.id === image.userId? user.name : ""
              )}</div>
            </div>
          ))
        }
      </div>
    </main>
  );
}
