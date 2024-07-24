"use client";

import router, { useRouter } from 'next/navigation';
import React from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
}

interface PostPreviewProps {
  post: Post;
  onClick : any
}

const MyPostPreview: React.FC<PostPreviewProps> = ({ post,onClick }) => {
  const router = useRouter();
  const handleClick = () => {
    console.log("click post id--",post);
    router.push(`/posts/${post._id}`);
  };
  const previewText = post.content.slice(0, 30) + (post.content.length > 30 ? '...' : '');
  return (
    <div onClick={onClick ? () => onClick(post) : handleClick}  id={post.id} key={post.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{previewText}</p>
      <div className="flex items-center mb-4">
        <span className="text-sm text-gray-500 mr-2">Category: {post.category}</span>
      </div>
      <div className="mt-4 flex space-x-4">
      </div>
    </div>
  );
};

export default MyPostPreview;



