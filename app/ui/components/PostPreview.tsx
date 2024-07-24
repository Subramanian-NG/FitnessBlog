"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import { useSession } from 'next-auth/react';
import ViewPost from './ViewPost';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface PostPreviewProps {
  post: Post;
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    //console.log("post id--",post);
    router.push(`/posts/${post._id}`);
  };

  const previewText = post.content.slice(0, 30) + (post.content.length > 30 ? '...' : '');

  return (
    <div 
      id={post.id} 
      key={post.id} 
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out" 
    >
      <div onClick={handleClick} className='cursor-pointer'>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{previewText}</p>
      <div className="flex items-center mb-4">
        <span className="text-sm text-gray-500 mr-2">Category: {post.category}</span>
      </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <ShareButton postId={post._id} />
        {session?.user && (
          <BookmarkButton postId={post._id} userId={session.user.id} />
        )}
      </div>
    </div>
  );
};

export default PostPreview;
