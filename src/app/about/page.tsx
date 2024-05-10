import React from 'react'

const page = () => {
  return (
    <section id="about" className='p-4 md:p-10'>
      <h1 className='text-2xl font-semibold text-pink-300'>Welcome to Bloggy!</h1>
      <p>We are passionate about creating a space for everyone to share their voice and connect with others. This user-friendly blog app provides all the tools you need to express yourself and engage with a vibrant community.</p>
      
      <h1 className='text-xl font-semibold mt-4 text-blue-300'>What You Can Do</h1>
      <ul>
        <li>Create Compelling Content: Write insightful blog posts on any topic that interests you. Share your knowledge, experiences, or simply spark a conversation.</li>
        <li className='mt-2'>Express Yourself Freely: Craft beautiful and engaging posts with rich text formatting options. Let your creativity shine through!</li>
        <li className='mt-2'>Manage Your Blog: Edit or delete your posts at any time to ensure your content stays fresh and up-to-date.</li>
        <li className='mt-2'>Appreciate others: You like a post? Let them know by liking their posts.</li>
        <li className='mt-2'>Connect with Others (Coming Soon!):  In the future, you will be able to comment on posts and even share them through various social media platforms, fostering a space for interaction and discussion.</li>
      </ul>

      <h1 className='text-xl font-semibold mt-4 text-yellow-300'>Built for Performance and Security</h1>
      <p>This blog app is built with cutting-edge technologies to ensure a smooth and secure experience.</p>
      <ul className='mt-2'>
        <li className='mt-2'><span className='text-green-300'>T3 Stack (TypeScript, Next.js, Drizzle):</span> This powerful combination provides a robust foundation for the application, delivering optimal speed and efficiency.</li>
        <li className='mt-2'><span className='text-green-300'>NextAuth.js:</span> Securely manage user logins and protect user data with this robust authentication library.</li>
        <li className='mt-2'><span className='text-green-300'>PostgreSQL with Drizzle ORM:</span> Leverage the power of PostgreSQL for data storage and utilize Drizzle ORM for seamless interaction with the database.</li>
        <li className='mt-2'><span className='text-green-300'>Tailwind CSS:</span> Create a visually appealing and responsive user interface that adapts flawlessly to any device.</li>
        <li className='mt-2'><span className='text-green-300'>Material UI (MUI):</span> Maintain a consistent and user-friendly experience with a comprehensive set of beautiful and functional icons.</li>
      </ul>
    </section>
  )
}

export default page