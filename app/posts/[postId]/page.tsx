'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import ShareButton from '../../ui/components/ShareButton';
import BookmarkButton from '../../ui/components/BookmarkButton';
import { useSession } from 'next-auth/react';

interface Post {
  _id: string;
  title: string;
  content: string;
  category: string;
  owner_id: string | null;
}

const PostPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract the postId from the pathname
  const postId = pathname.split('/').pop();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await axios.get(`/api/blogs/${postId}`);
          setPost(response.data.post);
          setLoading(false);
        } catch (err) {
          setError('Failed to load post');
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [postId]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-medium animate-pulse">Loading...</span>
      </div>
    );
  }
  

  if (error) {
    return <div className="flex justify-center items-center h-screen"><span className="text-xl font-medium text-red-500">{error}</span></div>;
  }

  if (!post) {
    return <div className="flex justify-center items-center h-screen"><span className="text-xl font-medium">No post found</span></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 justify-center items-center">
      <div className="relative bg-white bg-opacity-80 p-8 rounded-lg shadow-xl max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-4 bg-black bg-opacity-60 text-white p-4 rounded-md" style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}>
          {post.title}
        </h1>
        <div className="mb-4 text-black">Category: <span className="text-indigo-700 font-semibold">{post.category}</span></div>
        <div className="mb-8">
          <p className="text-black text-lg leading-relaxed">{post.content}</p>
        </div>
        <div className="flex space-x-4">
          <ShareButton postId={post._id} />
          {session?.user && (
            <BookmarkButton postId={post._id} userId={session.user.id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
