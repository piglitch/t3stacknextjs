/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'

import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { type Editor as TinyMCEEditor } from 'tinymce';
import { useRouter } from 'next/navigation';
import { createPost } from '../lib/actions';

export default function Page() {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const postRef = useRef(null);
  const [title, setTitle] = useState('');
  const router = useRouter();
  console.log(title);
  const log = async() => {
    if (editorRef.current) {
      const newPost = await createPost(editorRef.current.getContent(), title);
      router.push('/my-posts');
      console.log(editorRef.current.getContent());
    }
  };

  const handleFilePicker = (callback: (fileUrl: string) => void, value: string, meta: any) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          callback((event.target?.result as string) || ''); // Pass the file content to the callback
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className='p-4'>
      <label htmlFor="title" className='text-lg'>
        Title 
      </label>
      <input type="text" id='title' className='ml-2 rounded-md p-2 text-black' 
      value={title} onChange={e => setTitle(e.target.value)}/>
      <div className='mt-8'>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_URL}
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue=""
          init={{
            height: 500,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            menubar: 'favs file edit view insert format tools table help',
            file_picker_types: 'file image media',
            file_picker_callback: handleFilePicker,
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </div>
      <div className='flex justify-between gap-10 px-4'>
        <button className='rounded-lg mt-5 p-2 w-24 bg-red-600' onClick={() => router.push("/my-posts")}>DISCARD</button>
        <button className='rounded-lg mt-5 w-24 p-2 bg-green-500' onClick={log}>POST</button>  
      </div>      
    </div>
  )
}
